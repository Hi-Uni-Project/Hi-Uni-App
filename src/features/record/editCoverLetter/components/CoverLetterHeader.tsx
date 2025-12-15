import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { cn } from '@/shared/lib/cn';

interface CoverLetterHeaderProps {
  title: string;
  rightButtonText?: string;
  isRightButtonDisabled?: boolean;
  onRightButtonPress?: () => void;
}

const CoverLetterHeader = ({
  title,
  rightButtonText,
  isRightButtonDisabled,
  onRightButtonPress,
}: CoverLetterHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <>
      <View
        className="absolute left-0 right-0 top-0 z-50 bg-white"
        style={{ height: insets.top }}
      />

      <View
        className="absolute left-0 right-0 z-50 bg-white"
        style={{ top: insets.top, height: 74 }}>
        <StatusBar barStyle="dark-content" />

        <View className="h-full flex-row items-center justify-between px-5">
          <Pressable
            hitSlop={14}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowIcons
              direction="left"
              width={24}
              height={20}
              color="#1E2128"
            />
          </Pressable>

          <View className="absolute left-0 right-0 flex-1 items-center">
            <Text className="text-main-text typo-sub-title-20-semibold">
              {title}
            </Text>
          </View>

          {rightButtonText && onRightButtonPress && (
            <Pressable
              onPress={onRightButtonPress}
              disabled={isRightButtonDisabled}>
              <Text
                className={cn(
                  'text-primary-purple typo-sub-title-18-medium',
                  isRightButtonDisabled && 'text-surface-300',
                )}>
                {rightButtonText}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default CoverLetterHeader;
