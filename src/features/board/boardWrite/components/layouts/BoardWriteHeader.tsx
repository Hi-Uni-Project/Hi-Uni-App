import React from 'react';

import clsx from 'clsx';
import { View, Pressable, Text } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  paddingTop: number;
  height: number;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitEnabled: string | boolean;
}

const BoardWriteHeader = ({
  paddingTop,
  height,
  onClose,
  isSubmitEnabled,
  onSubmit,
}: Props) => {
  return (
    <View
      className="bg-white px-5"
      style={{
        paddingTop,
        height,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 20,
      }}>
      <View className="h-[70px] flex-row items-center justify-between">
        <Pressable onPress={onClose}>
          <ActionIcons type="close" width={24} height={20} color="#1E2128" />
        </Pressable>

        <Text className="text-main-text typo-sub-title-20-semibold">
          글쓰기
        </Text>

        <Pressable disabled={!isSubmitEnabled} onPress={onSubmit}>
          <Text
            className={clsx(
              `${isSubmitEnabled ? 'text-primary-purple' : 'text-surface-300'} typo-sub-title-18-medium`,
            )}>
            완료
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BoardWriteHeader;
