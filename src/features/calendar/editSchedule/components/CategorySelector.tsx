import React, { useEffect, useRef, useState } from 'react';

import { Pressable, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import CategoryModal from './CategoryModal';

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
  const titleRef = useRef<View>(null);

  const [isTitleModalVisible, setIsTitleModalVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(isTitleModalVisible ? 1 : 0, {
      duration: 300,
    });

    if (isTitleModalVisible && titleRef.current) {
      titleRef.current.measure((x, y, width, height, pageX, pageY) => {
        setPosition({ top: pageY + height, left: pageX });
      });
    }
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

      <CategoryModal
        visible={isTitleModalVisible}
        onClose={() => setIsTitleModalVisible(false)}
        options={categories}
        onSelect={categoryId => {
          const foundCategory = categories.find(
            category => category.categoryId === categoryId,
          );

          setCurrentCategory(foundCategory ? { ...foundCategory } : null);
        }}
        position={{
          top: position.top,
          left: position.left,
        }}
      />
    </>
  );
};

export default CategorySelector;
