import React, { useState } from 'react';

import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useDropdownOverlay } from '@/shared/components/DropdownProvider';
import ChevronDownIcon from '@/static/icons/down_chevron.svg';
import ChevronUpIcon from '@/static/icons/top_chevron.svg';

interface HUCategoryDropdownProps {
  ref: React.RefObject<View>;

  dropdownItems: string[];
  onSelectItem: (item: string) => void;

  // selected값이 null 일 경우 보여질 기본 텍스트를 말함
  categoryName?: string;

  // selected 값이 있을 경우 보여질 컴포넌트
  selectedComponentStyle?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;
}

const HUDropdown = ({
  ref,
  dropdownItems,
  onSelectItem,
  categoryName = '선택',
  containerStyle,
}: HUCategoryDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { isVisible, openDropdown, closeDropdown, animatedExpandStyle } =
    useDropdownOverlay();

  return (
    <Pressable
      onPress={() => {
        openDropdown(
          ref,
          <View className="items-start">
            <Animated.View
              className="mb-5 flex-row items-center rounded-full border-[1px] border-primary-purple bg-[#f9f9f9] px-[15px] py-[10px]"
              style={{ zIndex: 900 }}>
              <Text className="pr-2 text-surface-500 typo-body-16-regular">
                {selectedItem || categoryName}
              </Text>
              <Animated.View>
                <ChevronUpIcon color="#979797" width={12} height={12} />
              </Animated.View>
            </Animated.View>
            <Animated.ScrollView
              className="border-1 border-surface-300 bg-white shadow-lg"
              style={[
                {
                  borderRadius: 15,
                  width: 122,
                },
                animatedExpandStyle,
              ]}>
              {dropdownItems.map((item, index) => (
                <Pressable
                  key={`${item}-${index}`}
                  className="border-b-2 border-gray-200 px-4 py-[15px] typo-body-16-regular"
                  style={
                    index === dropdownItems.length - 1
                      ? { borderBottomWidth: 0 }
                      : undefined
                  }
                  onPress={() => {
                    onSelectItem && onSelectItem(item);
                    closeDropdown();
                    setTimeout(() => {
                      setSelectedItem(item);
                    }, 300);
                  }}>
                  <Text>{item}</Text>
                </Pressable>
              ))}
            </Animated.ScrollView>
          </View>,
        );
      }}>
      <View
        ref={ref}
        className="flex-row items-center rounded-full border-[1px] border-surface-300 px-[15px] py-[10px]"
        style={[{ zIndex: 900 }, isVisible && { opacity: 1 }, containerStyle]}>
        <Text className="pr-2 text-surface-500 typo-body-16-regular">
          {selectedItem || categoryName}
        </Text>
        <Animated.View>
          <ChevronDownIcon color="#979797" width={12} height={12} />
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default HUDropdown;
