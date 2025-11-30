import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeStackNavigationProp } from '@/navigation/types/navigationTypes';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { cn } from '@/shared/lib/cn';
import MoreIcon from '@/static/icons/more.svg';

interface ResumeEditHeaderProps {
  isCompleteDisabled: boolean;
  onCompletePress: () => void;
}

const ResumeEditHeader = ({
  onCompletePress,
  isCompleteDisabled,
}: ResumeEditHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackNavigationProp>();

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
              내 이력서
            </Text>
          </View>

          <View className="flex-row">
            <Pressable onPress={onCompletePress} disabled={isCompleteDisabled}>
              <Text
                className={cn(
                  'typo-sub-title-18-medium',
                  isCompleteDisabled
                    ? 'text-surface-300'
                    : 'text-primary-purple',
                )}>
                저장
              </Text>
            </Pressable>

            <Pressable className="ml-[18px] mt-[2px]">
              <MoreIcon />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default ResumeEditHeader;
