import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, View, TextInput } from 'react-native';
import {
  KeyboardAvoidingInput,
  KeyboardAvoidingInputHandle,
} from 'react-native-keyboard-avoiding-input';

export default function App() {
  const [state, setState] = React.useState('');
  const [state2, setState2] = React.useState('');
  const inputref = React.useRef<KeyboardAvoidingInputHandle>(null);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingInput
        input={TextInput}
        placeholder="Text me!"
        value={state}
        returnKeyType="next"
        onChangeText={setState}
        onOpen={() => console.log('abriu')}
        onSubmitEditing={() => inputref.current?.focus()}
      />
      <KeyboardAvoidingInput
        input={TextInput}
        ref={inputref}
        placeholder="Other TextInput"
        returnKeyIcon={
          <MaterialIcons name="close" size={24} color="black" />
        }
        value={state2}
        onChangeText={setState2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
