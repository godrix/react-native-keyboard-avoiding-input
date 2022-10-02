import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, View, TextInput } from 'react-native';
import { InputAvoidingKeyboard, InputAvoidingKeyboardHandle } from 'react-native-input-avoiding-keyboard';

export default function App() {
  const [state, setState] = React.useState("")
  const [state2, setState2] = React.useState("")
  const inputref = React.useRef<InputAvoidingKeyboardHandle>(null)

  const e = ()=> alert('submit')
  return (
    <View style={styles.container}>
      <InputAvoidingKeyboard
        input={TextInput}
        placeholder="Text me!"
        value={state}
        onChangeText={setState}
        actionButtonType="done"
        doneText={'next'}
        onSubmitEditing={()=> inputref.current?.open() }
        onOpen={() => console.log("open")}
        onClose={() => console.log("close")}
      />
      <InputAvoidingKeyboard
        input={TextInput}
        ref={inputref}
        placeholder="Other TextInput"
        actionButtonIcon={<MaterialIcons name="close" size={24} color="black" />}
        value={state2}
        onChangeText={setState2}
        actionButtonType="done"
        onSubmitEditing={e}

        onOpen={() => console.log("open")}
        onClose={() => console.log("close")}
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

