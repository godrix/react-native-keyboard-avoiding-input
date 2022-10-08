import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  View,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';

import Style from './style';
import { isIOSDevice, keyBoardTypeHelperForIos } from '../utils';

type Props = TextInputProps & {
  input: React.ComponentType<TextInputProps>;
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
  toggleShowText?: string;
  toggleHideText?: string;
  returnKeyIcon?: React.ReactNode;
  actionLabelStyle?: StyleProp<TextStyle>;
  actionContainerStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  toggleVisibilityPassword?: boolean;
  returnKeyTypeClear?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  androidOpenInputDelay?: number;
};

export type KeyboardAvoidingInputHandle = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

export const KeyboardAvoidingInput = forwardRef((props: Props, ref) => {
  const {
    value,
    style,
    onBlur,
    onFocus,
    keyboardType,
    onChangeText,
    secureTextEntry,
    onSubmitEditing,
    returnKeyType,
    returnKeyLabel,
    input: Input,
    returnKeyIcon,
    showPasswordIcon,
    hidePasswordIcon,
    inputStyle,
    containerStyle,
    toggleShowText = 'Show',
    toggleHideText = 'Hide',
    toggleVisibilityPassword = false,
    returnKeyTypeClear = false,
    onOpen,
    onClose,
    androidOpenInputDelay = 200,
    actionLabelStyle,
    actionContainerStyle,
    ...rest
  } = props;

  const inputRef = React.useRef<TextInput>(null);
  const isIOS = isIOSDevice();
  const keyBoardTypeHelperIos = keyBoardTypeHelperForIos(keyboardType, secureTextEntry);

  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);

  const focus = () => openModal();
  const blur = () => closeModal();
  const clear = () => clearInput();

  const toggleVisiblePass = () => setVisiblePass((prev) => !prev);

  const openModal = () => {
    if (modalVisible) {
      return;
    }
    setModalVisible(true);

    setTimeout(() => {
      inputRef?.current?.focus();
    }, androidOpenInputDelay);

    onOpen?.();
  };
  const closeModal = () => {
    setModalVisible(false);
    if (visiblePass) {
      toggleVisiblePass();
    }
    onClose?.();
  };
  const _onSubmitEditing = (e?: any) => {
    closeModal();
    onSubmitEditing?.(e);
  };
  const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    closeModal();
    onBlur?.(e);
  };
  const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    e.preventDefault();
    openModal();
    onFocus?.(e);
  };

  const clearInput = () => {
    onChangeText?.('');
  };

  const renderActionButton = () => {
    if (!secureTextEntry) {
      const iconAction = returnKeyIcon || (
        <Text style={[Style.actionLabel, actionLabelStyle]}>{returnKeyLabel || returnKeyType}</Text>
      );

      return (
        <TouchableOpacity
          style={[Style.action, actionContainerStyle]}
          onPress={returnKeyTypeClear ? () => clearInput() : () => _onSubmitEditing()}>
          {iconAction}
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderPasswordIcon = () => {
    if (secureTextEntry && toggleVisibilityPassword) {
      const iconHide = hidePasswordIcon || (
        <Text style={[Style.actionLabel, actionLabelStyle]}>{toggleHideText}</Text>
      );
      const iconShow = showPasswordIcon || (
        <Text style={[Style.actionLabel, actionLabelStyle]}>{toggleShowText}</Text>
      );
      return (
        <TouchableOpacity style={[Style.action, actionContainerStyle]} onPress={toggleVisiblePass}>
          {visiblePass ? iconHide : iconShow}
        </TouchableOpacity>
      );
    }
    return null;
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    clear,
  }));

  return (
    <>
      <Input
        {...rest}
        style={style}
        keyboardType={keyboardType}
        editable={isIOS ? !modalVisible : true}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onPressIn={openModal}
        value={value}
        showSoftInputOnFocus={isIOS}
        onFocus={_onFocus}
        onBlur={_onBlur}
      />
      <Modal
        visible={modalVisible}
        onShow={focus}
        onRequestClose={closeModal}
        transparent
        animationType="slide">
        <SafeAreaView style={Style.safeArea}>
          <TouchableOpacity style={Style.outside} onPress={closeModal} />
          <View
            style={[
              keyBoardTypeHelperIos ? Style.wrapperFixKeyboardType : Style.wrapper,
              containerStyle,
            ]}>
            <TextInput
              ref={inputRef}
              {...rest}
              keyboardType={keyboardType}
              style={[Style.input, inputStyle]}
              autoFocus={isIOS}
              onFocus={_onFocus}
              onBlur={_onBlur}
              onChangeText={onChangeText}
              onSubmitEditing={_onSubmitEditing}
              secureTextEntry={visiblePass ? false : secureTextEntry}
              value={value}
            />
            {renderActionButton()}
            {renderPasswordIcon()}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
});
