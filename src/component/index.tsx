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
  Text
} from 'react-native';

import Style from './style';
import { isIOSDevice, keyBoardTypeHelperForIos } from '../utils';

type Props = TextInputProps & {
  input: React.ComponentType<TextInputProps>;
  actionButtonIcon?: React.ReactNode;
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
  actionLabelStyle?: StyleProp<TextStyle>;
  actionContainerStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  showToggleVisibilityPassword?: boolean;
  doneText?: string;
  clearText?: string;
  showText?: string;
  hideText?: string;
  actionButtonType?: 'done' | 'clear' | undefined;
  onOpen?: () => void;
  onClose?: () => void;
};

export type KeyboardAvoidingInputHandle = {
  open: () => void;
  close: () => void;
  focus: () => void;
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
    input: Input,
    actionButtonIcon,
    showPasswordIcon,
    hidePasswordIcon,
    inputStyle,
    containerStyle,
    doneText = "Done",
    clearText = "Clear",
    showText = "Show",
    hideText = "Hide",
    actionButtonType,
    showToggleVisibilityPassword = false,
    onOpen,
    onClose,
    actionLabelStyle,
    actionContainerStyle,
    ...rest
  } = props;

  const inputRef = React.useRef<TextInput>(null);
  const isIOS = isIOSDevice();
  const keyBoardTypeHelperIos = keyBoardTypeHelperForIos(keyboardType, secureTextEntry);

  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);

  const open = () => openModal();
  const close = () => closeModal();
  const focus = () => inputRef?.current?.focus();
  const clear = () => clearInput();

  const toggleVisiblePass = () => setVisiblePass(prev => !prev);

  const openModal = () => {
    if (modalVisible) {
      return;
    }
    setModalVisible(true);
    inputRef?.current?.focus();
    onOpen && onOpen();
  };
  const closeModal = () => {
    setModalVisible(false);
    if (visiblePass) {
      toggleVisiblePass();
    }
    onClose && onClose();
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
    openModal();
    onFocus?.(e);
  };

  const clearInput = () => {
    onChangeText?.('');
  };

  const renderActionButton = () => {
    if (!secureTextEntry && actionButtonType) {
      const iconAction = actionButtonIcon || <Text style={[Style.actionLabel, actionLabelStyle]}>{actionButtonType === 'done' ? doneText : clearText}</Text>;
      const isDone = actionButtonType === 'done';
      return (
        <TouchableOpacity style={[Style.action, actionContainerStyle]} onPress={isDone ? () => _onSubmitEditing() : () => clearInput()}>
          {iconAction}
        </TouchableOpacity>)
    }

    return null;
  };

  const renderPasswordIcon = () => {

    if (secureTextEntry && showToggleVisibilityPassword) {
      const iconHide = hidePasswordIcon || <Text style={[Style.actionLabel, actionLabelStyle]}>{hideText}</Text>;
      const iconShow = showPasswordIcon || <Text style={[Style.actionLabel, actionLabelStyle]}>{showText}</Text>;
      return (
        <TouchableOpacity
          style={[Style.action, actionContainerStyle]}
          onPress={toggleVisiblePass}>
          {visiblePass ? iconHide : iconShow}
        </TouchableOpacity>
      );
    }
    return null;

  }

  useImperativeHandle(ref, () => ({
    open,
    close,
    focus,
    clear,
  }));

  return (
    <>
      <Input
        {...rest}
        style={style}
        keyboardType={keyboardType}
        editable={!modalVisible}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        onFocus={openModal}
      />
      <Modal
        visible={modalVisible}
        onShow={focus}
        onRequestClose={closeModal}
        transparent
        animationType="slide">
        <SafeAreaView style={Style.safeArea}>
          <TouchableOpacity style={Style.outside} onPress={closeModal} />
          <View style={[keyBoardTypeHelperIos ? Style.wrapperFixKeyboardType : Style.wrapper, containerStyle]}>
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
