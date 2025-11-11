import React from 'react';

import { View, Text } from 'react-native';
import { Pressable } from 'react-native';

import ChevronIcons from '@/shared/icons/ChevronIcons';
import FireIcon from '@/static/icons/fire.svg';

interface Props {
  onPress?: () => void;
  title: string;
}

const SectionTitle = ({ onPress, title }: Props) => {
  return (
    <View className="mb-5 flex-row items-center justify-between px-5">
      <View className="flex-row items-center">
        <FireIcon width={18} height={20} color={'#ffffff'} />
        <Text
          className="ml-2 text-white typo-sub-title-20-semibold"
          style={{ fontWeight: '700' }}>
          이번주 {title === '전체' ? '전체 취업 정보' : title} 인기글
        </Text>
      </View>

      <Pressable className="flex-row items-center" onPress={onPress}>
        <Text className="mr-2 text-surface-300 typo-caption-14-regular">
          더 보기
        </Text>
        <ChevronIcons direction="right" width={6} height={10} color="#B7B7B7" />
      </Pressable>
    </View>
  );
};

export default SectionTitle;
