import React from 'react';

import { Text, TextInput, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import MemoIcon from '@/static/icons/memo.svg';

interface ScheduleMemoInputProps {
  memo: string;
  updateMemo: (text: string) => void;
  onFocus?: () => void;
}

const ScheduleMemoInput = ({
  memo,
  updateMemo,
  onFocus,
}: ScheduleMemoInputProps) => {
  return (
    <Animated.View className="mt-5" layout={LinearTransition}>
      <View className="flex-row items-center">
        <MemoIcon className="text-surface-500" width={20} height={20} />
        <Text className="ml-2 text-surface-700 typo-body-16-semibold">
          메모
        </Text>
      </View>
      <TextInput
        value={memo}
        onChangeText={text => updateMemo(text)}
        placeholder="메모를 입력해주세요"
        onFocus={onFocus}
        multiline={true}
        className="mt-[10px] rounded-[15px] bg-surface-100 px-[11px] py-[14px] text-main-text typo-body-15-regular"
        style={{
          minHeight: 100,
          textAlignVertical: 'top',
        }}
      />
    </Animated.View>
  );
};

export default ScheduleMemoInput;
