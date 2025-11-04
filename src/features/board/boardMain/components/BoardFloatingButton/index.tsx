import React from 'react';

import { Platform, Pressable, StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import WriteButton from '@/static/icons/write-button.svg';

interface Props {
  insets: EdgeInsets;
}

const BoardFloatingButton = ({ insets }: Props) => {
  return (
    <Pressable
      className="absolute right-1"
      style={[
        styles.shadow,
        {
          bottom: insets.bottom - 30,
        },
      ]}>
      <WriteButton />
    </Pressable>
  );
};

export default BoardFloatingButton;

// custom shadow -> svg 적용
const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
