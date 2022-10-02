# react native input avoiding keyboard 📲
This library allows you to pass the textinput just above the keyboard, thus floating on it, in cases that this is necessary

All the props are passed down to a new TextInput Component.

![iOS Example](./.github/images/ios/sample.gif) ![Android Example](./.github/images/android/sample.gif)

## Installation

```sh
npm install react-native-input-avoiding-keyboard
```

## Usage

```js
import { TextInput } from 'react-native';
import { InputAvoidingKeyboard } from 'react-native-input-avoiding-keyboard';

// ...

 <InputAvoidingKeyboard
    input={TextInput}

    // Rest props a text input
    placeholder="Text me!"
    style={Style.input}
    value={state}
    onChangeText={setState}
      />
```

## Usage with style-components 💅🏾

```js
import { InputAvoidingKeyboard } from 'react-native-input-avoiding-keyboard';
import styled from 'styled-components/native';


// Custon TextInput with styled-components
const InputAwesome = styled.TextInput`
  width: 100%;
  height: 60px;
  font-size: 18px;
  flex: 1;
  color: #010101;
  margin-left: 10px;
`;

// ...

 <InputAvoidingKeyboard
    input={InputAwesome}

    // Rest props a TextInput
    placeholder="Text me!"
      />
```
## Usage with react-hook-form 📋

```js
import { InputAvoidingKeyboard } from 'react-native-input-avoiding-keyboard';
import styled from 'styled-components/native';
import { Controller, useForm } from 'react-hook-form';


// Custon TextInput with styled-components
const InputAwesome = styled.TextInput`
  width: 100%;
  height: 60px;
  font-size: 18px;
  flex: 1;
  color: #010101;
  margin-left: 10px;
`;

// ...
const {control} = useForm();

<Controller
    name="name"
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <InputAvoidingKeyboard
        input={InputAwesome}

        placeholder="It's me! Carlio"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
          />
        )}
      />
```
## How to select the next TextInput
The library exposes some methods through the ref `open`, `close`, `focus`, `clear`

![iOS Example](./.github/images/ios/sample-ref.gif) ![Android Example](./.github/images/android/sample-ref.gif)

```js
import { TextInput } from 'react-native';
import { InputAvoidingKeyboard, InputAvoidingKeyboardHandle } from 'react-native-input-avoiding-keyboard';

// ...

const inputRef = React.useRef<InputAvoidingKeyboardHandle>(null)

 <InputAvoidingKeyboard
    input={TextInput}
    // Rest props a text input
    onSubmitEditing={()=> inputref.current?.open()}
    placeholder="Text me!"
    />

 <InputAvoidingKeyboard
    input={TextInput}
    ref={inputRef}
    // Rest props a text input
    placeholder="Other input"
    />

```

## Props

| Name   |      Description      |  Details |
|----------|:-------------:|------:|
| input |  React component type TextInput | `required` TextInput Component |
 |actionButtonType| Add an action button for `Done` that uses `onSubmitEditing` and in the case of `Clear` cleans Input | `done`  `clear`  `undefined`|
 |actionButtonIcon| Renders an icon in place of `Done` or `Clear` text  | `React component` |
 |doneText| Change the text of `Done` | `string` |
 |clearText| Change the text of `Clear` | `string` |
 |showText|Change the text of `Show` | `string` |
 |hideText| Change the text of `Hide` | `string` |
 |showPasswordIcon| Renders an icon in place of `Show` | `React component` |
 |hidePasswordIcon|Renders an icon in place of `Hide`| `React component` |
 |actionLabelStyle| responsible for the style of the texts of `Done`, `Clear`, `Hide` or `Show` | `StyleProp<TextStyle>` |
 |actionContainerStyle| responsible for the container of the action text | `StyleProp<ViewStyle>` |
 |containerStyle| Responsible for the `InputAvoidingKeyboard` container style | `StyleProp<ViewStyle>` |
 |inputStyle| Responsible for the `InputAvoidingKeyboard` style | `StyleProp<TextInputStyle>`  |
 |onOpen| function called the input is opened | `function` |
 |onClose| function called the input is closed| `function` |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

react-native-input-avoiding-keyboard is [MIT licensed](https://github.com/godrix/react-native-input-avoiding-keyboard/tree/main/LICENSE) and built with ❤️ in 🇧🇷 by [Godrix](https://www.linkedin.com/in/carlosgodri/)
