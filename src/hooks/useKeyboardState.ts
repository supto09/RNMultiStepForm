import * as React from 'react';
import {Keyboard, Platform, KeyboardEvent} from 'react-native';

export const useKeyboardState = () => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const subscriptions = React.useRef<any[]>([]);

  const keyboardShown = keyboardHeight > 0;

  React.useEffect(() => {
    const onKeyboardChange = (e: KeyboardEvent) => {
      if (Platform.OS === 'android') {
        setKeyboardHeight(e.endCoordinates.height);
      } else {
        if (
          e.startCoordinates &&
          e.endCoordinates.screenY <= e.startCoordinates.screenY
        ) {
          setKeyboardHeight(e.endCoordinates.height);
        } else {
          setKeyboardHeight(0);
        }
      }
    };

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setKeyboardHeight, subscriptions]);

  return {keyboardHeight, keyboardShown};
};
