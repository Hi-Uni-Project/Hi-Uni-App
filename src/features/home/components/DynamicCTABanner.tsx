import React, { useState } from 'react';

import {
  View,
  Text,
  ViewProps,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import ActionIcons from '@/shared/icons/ActionIcons';
import ChevronIcons from '@/shared/icons/ChevronIcons';
import shadowStyleSheet from '@/styles/shadowStyleSheet';

interface DynamicCTABannerProps extends ViewProps {
  visible?: boolean;
  onSharedPress: () => void;
}

// 안드로이드, iOS에서 텍스트의 줄 높이와 정렬이 다르게 나타나는 문제 해결을 위함
const styles = StyleSheet.create({
  icon: {
    ...Platform.select({
      android: { marginTop: 2 },
    }),
  },
});

const DynamicCTABanner = ({
  visible,
  onSharedPress,
  ...rest
}: DynamicCTABannerProps) => {
  const [isVisible, setIsVisible] = useState(visible ?? false);

  if (isVisible === false) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      className="relative h-[83px] justify-center rounded-[15px] border-[1px] border-gray-200 bg-white"
      {...rest}
      style={[shadowStyleSheet.dropShadow, rest.style]}>
      <View className="mx-6">
        <Text className="text-gray-500 typo-14-regular">
          {'미혜님, 어제 본 면접 어떠셨나요?'}
        </Text>

        <Pressable className="flex-row items-center" onPress={onSharedPress}>
          <Text className="mr-2 text-main-text typo-sub-title-17-semibold">
            {'면접 후기를 학우들에게 공유해주세요!'}
          </Text>
          <View style={styles.icon}>
            <ChevronIcons
              direction="right"
              width={7}
              height={14}
              color="#010101"
            />
          </View>
        </Pressable>
      </View>

      <Pressable
        className="absolute right-4 top-4"
        onPress={() => setIsVisible(false)}>
        <ActionIcons type="close" width={16} height={16} color="#DADADA" />
      </Pressable>
    </Animated.View>
  );
};

export default DynamicCTABanner;
