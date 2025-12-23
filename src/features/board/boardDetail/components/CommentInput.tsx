import React, { useRef, useImperativeHandle, forwardRef } from 'react';

import { View, TextInput, Pressable, Platform } from 'react-native';

import CommentActionIcons from '@/shared/icons/CommentActionIcons';
import { shadowStyleSheet } from '@/shared/styles/shadow';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  keyboardHeight: number;
  bottomInset: number;
  isEditing?: boolean;
  originalContent?: string;
}

export interface CommentInputRef {
  focus: () => void;
}

const CommentInput = forwardRef<CommentInputRef, Props>(
  (
    {
      value,
      onChangeText,
      onSubmit,
      keyboardHeight,
      bottomInset,
      isEditing = false,
      originalContent = '',
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    // 수정 모드에서는 원본과 다른 내용이 있을 때만 submit 활성화
    const isSubmitEnabled = isEditing
      ? value.trim() && value !== originalContent
      : value.trim();

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
              ref={inputRef}
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
          <Pressable
            onPress={onSubmit}
            className="ml-2"
            disabled={!isSubmitEnabled}>
            <CommentActionIcons
              action={isSubmitEnabled ? 'send-on' : 'send'}
              width={24}
              height={24}
            />
          </Pressable>
        </View>
      </View>
    );
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
