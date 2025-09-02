import React, { SetStateAction } from 'react';

import { Text, Pressable } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import StatusIcons from '@/shared/icons/StatusIcons';

interface Props {
  setIsModalVisible: (value: SetStateAction<boolean>) => void;
}

const DepsNotFoundButton = ({ setIsModalVisible }: Props) => {
  return (
    <Pressable
      className="mb-3 flex-row items-center justify-center"
      onPress={() => setIsModalVisible(true)}>
      <StatusIcons status="caution" width={16} height={16} color="#5B5B5B" />
      <Text className="ml-1 px-1 text-surface-700 typo-body-15-normal">
        학과를 찾을 수 없어요
      </Text>
      <ArrowIcons direction="right" color="#5B5B5B" width={11} height={11} />
    </Pressable>
  );
};

export default DepsNotFoundButton;
