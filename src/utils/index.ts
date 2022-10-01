// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { KeyboardTypeOptions, Platform } from 'react-native';

export const isIOSDevice = () => {
  return Platform.OS === 'ios';
};
export const keyBoardTypeHelperForIos = (
  keyboardType: KeyboardTypeOptions | undefined,
  securityText: boolean | undefined
) => {
  const ios = isIOSDevice();
  const keyboardTypeFix = ['number-pad', 'numeric', 'phone-pad', 'decimal-pad'];
  return (
    (ios && keyboardTypeFix.includes(keyboardType ?? '')) ||
    (ios && securityText)
  );
};
