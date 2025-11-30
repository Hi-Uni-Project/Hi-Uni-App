import React, { useEffect, useRef, useState } from 'react';

import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import ChevronDownIcon from '@/static/icons/down_chevron.svg';

interface HUCategoryDropdownProps {
  ref?: React.RefObject<View>;

  dropdownItems: string[];
  onSelectItem: (item: string) => void;

  // selected값이 null 일 경우 보여질 기본 텍스트를 말함
  categoryName?: string;

  // selected 값이 있을 경우 보여질 컴포넌트
  selectedComponentStyle?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;
}

const HUDropdown = ({
  dropdownItems,
  onSelectItem,
  categoryName = '선택',
  containerStyle,
}: HUCategoryDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<View>(null);

  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isVisible ? 180 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y: y + height });
      setIsVisible(true);
    });
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    onSelectItem(item);
    handleClose();
  };

  return (
    <>
      <Pressable onPress={handleOpen}>
        <View
          ref={triggerRef}
          className={`flex-row items-center rounded-full border-[1px] px-[15px] py-[10px] ${
            isVisible ? 'border-primary-purple' : 'border-surface-300'
          }`}
          style={containerStyle}>
          <Text className="pr-2 text-surface-500 typo-body-16-regular">
            {selectedItem || categoryName}
          </Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <ChevronDownIcon color="#979797" width={12} height={12} />
          </Animated.View>
        </View>
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}>
        <Pressable className="flex-1" onPress={handleClose}>
          <View
            className="absolute"
            style={{
              left: anchor.x,
              top: anchor.y + 5,
            }}>
            <Pressable onPress={e => e.stopPropagation()}>
              {/* 드롭다운 아이템 목록 */}
              <ScrollView
                className="border-[1px] border-surface-300 bg-white pl-[11px] pr-[10px]"
                style={[
                  {
                    borderRadius: 15,
                    width: 122,
                    maxHeight: 300,
                  },
                ]}>
                {dropdownItems.map((item, index) => (
                  <Pressable
                    key={`${item}-${index}`}
                    className="border-b-[1.5px] border-surface-200 pb-[12px] pt-[15px]"
                    style={[
                      index === dropdownItems.length - 1
                        ? { borderBottomWidth: 0, paddingBottom: 15 }
                        : undefined,
                    ]}
                    onPress={() => handleSelectItem(item)}>
                    <Text className="typo-body-16-regular">{item}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default HUDropdown;
