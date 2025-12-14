import React, { useEffect, useRef } from 'react';

import { View, Text, Modal, Pressable, Animated, Easing } from 'react-native';

import { cn } from '@/shared/lib/cn';

export interface SelectOption {
  label: string;
  value: string;
  onPress: () => void;
}

interface SelectBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: SelectOption[];
}

const SelectBottomSheet = ({
  visible,
  onClose,
  title,
  options,
}: SelectBottomSheetProps) => {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
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
  }, [visible, translateY]);

  const handleOptionPress = (option: SelectOption) => {
    onClose();
    option.onPress();
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="absolute bottom-0 w-full rounded-t-2xl bg-white p-5">
          <Pressable onPress={e => e.stopPropagation()}>
            <View className="mb-[25px] mt-1 flex-row items-center justify-center">
              <Text className="text-[#1E2128] typo-body-17-medium">
                {title}
              </Text>
            </View>

            {options.map((option, index) => (
              <Pressable
                key={option.value}
                onPress={() => handleOptionPress(option)}
                className="py-4">
                <View
                  className={cn(
                    'flex-row items-center justify-between pb-6',
                    index !== options.length - 1 &&
                      'border-b-[1.5px] border-b-surface-200',
                  )}>
                  <Text className="text-main-text typo-body-17-medium">
                    {option.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default SelectBottomSheet;
