import React from 'react';

import { View, Text, Pressable } from 'react-native';

import {
  POST_TYPE_DISPLAY_NAME,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import MoreIcon from '@/static/icons/more.svg';

interface Props {
  univ: string;
  subcategory?: PostType;
  paddingTop: number;
  onBackPress: () => void;
  onMorePress: () => void;
}

const BoardDetailHeader = ({
  univ,
  subcategory,
  paddingTop,
  onBackPress,
  onMorePress,
}: Props) => {
  return (
    <View style={{ paddingTop }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <Pressable onPress={onBackPress}>
          <ArrowIcons direction="left" width={26} height={26} color="#1E2128" />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-main-text typo-body-16-semibold">
            {POST_TYPE_DISPLAY_NAME[subcategory]} 게시판
          </Text>

          <Text className="text-surface-500 typo-caption-14-medium">
            {univ}
          </Text>
        </View>
        <Pressable onPress={onMorePress}>
          <MoreIcon width={26} height={26} color={'#1E2128'} />
        </Pressable>
      </View>
    </View>
  );
};

export default BoardDetailHeader;
