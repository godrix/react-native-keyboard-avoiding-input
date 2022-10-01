import * as React from 'react';

import { StyleSheet, View, TextInput } from 'react-native';
import { InputAvoidingKeyboard } from 'react-native-input-avoiding-keyboard';

export default function App() {
  const [state, setState] = React.useState("")

  return (
    <View style={styles.container}>
      <InputAvoidingKeyboard
        input={TextInput}
        placeholder="Text me!"
        value={state}
        onChangeText={setState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
