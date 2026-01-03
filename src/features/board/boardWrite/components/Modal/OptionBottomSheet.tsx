import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { View, Text, Modal, Pressable, Animated, Easing } from 'react-native';

import {
  POST_TYPE_OPTIONS,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import { cn } from '@/shared/lib/cn';

interface Props {
  optionSheetVisible: boolean;
  setOptionSheetVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<PostType>>;
}

const OptionBottomSheet = ({
  optionSheetVisible,
  setOptionSheetVisible,
  setSelectedOption,
}: Props) => {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (optionSheetVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [optionSheetVisible]);

  return (
    <Modal
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      visible={optionSheetVisible}
      animationType="fade">
      <Pressable className="flex-1 bg-black/40">
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="absolute bottom-0 w-full rounded-t-2xl bg-white p-5">
          <View className="mb-[25px] mt-1 flex-row items-center justify-center">
            <Text className="text-surface-700 typo-body-17-medium">
              말머리를 먼저 설정해주세요.
            </Text>
          </View>

          {POST_TYPE_OPTIONS.map((option, index) => (
            <Pressable
              key={option.value}
              onPress={() => {
                setSelectedOption(option.value);
                setOptionSheetVisible(false);
              }}
              className="py-4">
              <View
                className={cn(
                  'flex-row items-center justify-between pb-6',
                  index !== POST_TYPE_OPTIONS.length - 1 &&
                    'border-b-[1.5px] border-b-surface-200',
                )}>
                <Text className="text-main-text typo-body-17-medium">
                  {option.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default OptionBottomSheet;
