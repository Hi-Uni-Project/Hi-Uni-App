import React, { useEffect, useRef, useState } from 'react';

import { Pressable, ScrollView, Text, View } from 'react-native';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Category } from '@/shared/types/categoryType';
import HUBadge from '@/shared/ui/atoms/HUBadge';
import ChevronDownIcon from '@/static/icons/down_chevron.svg';

interface CategorySelectorProps {
  categories: Category[];
  currentCategory: Category | null;
  setCurrentCategory: (category: Category | null) => void;
}

const CategorySelector = ({
  categories,
  currentCategory,
  setCurrentCategory,
}: CategorySelectorProps) => {
  const titleRef = useRef(null);

  const [isTitleModalVisible, setIsTitleModalVisible] = useState(false);

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(isTitleModalVisible ? 1 : 0, {
      duration: 300,
    });
  }, [isTitleModalVisible]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotationDeg = interpolate(rotation.value, [0, 1], [0, 180]);

    return {
      transform: [
        {
          rotate: `${rotationDeg}deg`,
        },
      ],
    };
  });

  return (
    <>
      <Pressable
        className="mt-2"
        ref={titleRef}
        onPress={() => setIsTitleModalVisible(true)}>
        {currentCategory ? (
          <HUBadge
            text={currentCategory.categoryName}
            backgroundColor={currentCategory.backgroundColor}
            textColor={currentCategory.textColor}
            RightSideComponent={
              <Animated.View style={animatedIconStyle}>
                <ChevronDownIcon
                  className="ml-1 text-white"
                  width={12}
                  height={12}
                />
              </Animated.View>
            }
          />
        ) : (
          <HUBadge
            text="선택"
            borderColor="#DADADA"
            RightSideComponent={
              <Animated.View style={animatedIconStyle}>
                <ChevronDownIcon
                  className="ml-1 text-gray-400"
                  width={12}
                  height={12}
                />
              </Animated.View>
            }
          />
        )}
      </Pressable>

      <Popover
        from={titleRef}
        arrowShift={0.8}
        placement={PopoverPlacement.BOTTOM}
        offset={8}
        arrowSize={{ width: -10, height: 0 }}
        isVisible={isTitleModalVisible}
        popoverStyle={{
          borderRadius: 15,
          width: 122,
          backgroundColor: 'hidden',
        }}
        animationConfig={{
          delay: 0,
        }}
        onRequestClose={() => setIsTitleModalVisible(false)}
        displayArea={{ x: 16, y: 0, width: 300, height: 600 }}>
        <View className="rounded-b-[15px] rounded-t-[15px] bg-white shadow-lg">
          <ScrollView showsVerticalScrollIndicator={false} className="px-4">
            {categories?.map((category, index) => (
              <Pressable
                key={index}
                className="flex-row items-center border-b-2 border-gray-200 py-[15px] typo-body-16-regular"
                onPress={() => {
                  setCurrentCategory(category);
                  setIsTitleModalVisible(false);
                }}>
                <View
                  className="mr-2 h-[19px] w-[19px] rounded-full"
                  style={{ backgroundColor: category.backgroundColor }}
                />
                <Text className="text-start">{category.categoryName}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Popover>
    </>
  );
};

export default CategorySelector;
