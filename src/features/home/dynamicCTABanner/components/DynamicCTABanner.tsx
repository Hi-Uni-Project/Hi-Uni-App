import React, { useState } from 'react';

import {
  View,
  Text,
  ViewProps,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

import AnimatedCardView from '@/shared/components/AnimatedCardView';
import ActionIcons from '@/shared/icons/ActionIcons';
import ChevronIcons from '@/shared/icons/ChevronIcons';

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
}: DynamicCTABannerProps) => {
  const [isVisible, setIsVisible] = useState(visible ?? false);

  if (isVisible === false) {
    return null;
  }

  return (
    <AnimatedCardView
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      className="relative mx-5 mt-4 h-[83px] justify-center">
      <View className="mx-6">
        <Text className="text-surface-500 typo-caption-14-light">
          {'미혜님, 어제 본 면접 어떠셨나요?'}
        </Text>

        <Pressable className="flex-row items-center" onPress={onSharedPress}>
          <Text className="mr-2 text-main-text typo-body-17-semibold">
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
    </AnimatedCardView>
  );
};

export default DynamicCTABanner;
