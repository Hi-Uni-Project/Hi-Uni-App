import React from 'react';

import { TouchableWithoutFeedback, Animated, Keyboard } from 'react-native';

interface Props {
  visible: boolean;
  opacity: Animated.Value;
}

const KeyboardInputBackdrop = ({ visible, opacity }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          opacity: opacity,
          zIndex: 10,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default KeyboardInputBackdrop;
