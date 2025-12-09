import React from 'react';

import { View, TextInput, Pressable, Platform } from 'react-native';

import CommentActionIcons from '@/shared/icons/CommentActionIcons';
import { shadowStyleSheet } from '@/shared/styles/shadow';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  keyboardHeight: number;
  bottomInset: number;
}

const CommentInput = ({
  value,
  onChangeText,
  onSubmit,
  keyboardHeight,
  bottomInset,
}: Props) => {
  return (
    <View
      className="bg-white px-5 py-3"
      style={[
        {
          paddingBottom: bottomInset || 12,
          zIndex: 30,
          bottom: Platform.OS === 'android' ? keyboardHeight + 10 : -5,
        },
        shadowStyleSheet.dropShadowTop,
      ]}>
      <View className="flex-row items-center justify-between rounded-[15px] bg-surface-100 px-4">
        <View className="flex-1 justify-center" style={{ height: 52 }}>
          <TextInput
            placeholder="댓글을 입력하세요."
            placeholderTextColor="#979797"
            value={value}
            onChangeText={onChangeText}
            className="bottom-0.5 text-main-text typo-body-16-medium"
            style={{
              padding: 0,
              margin: 0,
              textAlignVertical: 'center',
              includeFontPadding: false,
            }}
            returnKeyType="send"
            onSubmitEditing={onSubmit}
            multiline
          />
        </View>
        <Pressable onPress={onSubmit} className="ml-2">
          <CommentActionIcons
            action={value.trim() ? 'send-on' : 'send'}
            width={24}
            height={24}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CommentInput;
