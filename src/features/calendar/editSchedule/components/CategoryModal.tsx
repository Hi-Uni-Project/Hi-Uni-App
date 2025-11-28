import React, { useEffect, useRef, useState } from 'react';

import { Portal } from '@gorhom/portal';
import { Modal, View, Text, Pressable, Platform, Animated } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { Category } from '@/shared/types/categoryType';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  options: Category[];
  onSelect: (value: number) => void;
  position: { top: number; left: number };
}

const CategoryList = ({
  options,
  onSelect,
}: {
  options: Category[];
  onSelect: (id: number) => void;
}) => (
  <>
    {options.map((option, index) => (
      <Pressable
        key={option.categoryId}
        className="w-[123px]"
        onPress={() => onSelect(option.categoryId)}>
        <View
          className={cn(
            'flex-row items-center border-b-surface-200 pb-[14px] pt-[15px]',
            index !== options.length - 1 ? 'border-b-[1px]' : '',
          )}>
          <View
            className="h-[19px] w-[19px] rounded-full"
            style={{ backgroundColor: option.backgroundColor }}
          />
          <Text className="ml-[7px] text-main-text typo-body-16-regular">
            {option.categoryName}
          </Text>
        </View>
      </Pressable>
    ))}
  </>
);

const PopoverContainer = ({
  top,
  left,
  children,
  style,
}: {
  top: number;
  left: number;
  children: React.ReactNode;
  style?: any;
}) => (
  <Animated.View
    className="absolute rounded-[15px] bg-white px-[10px]"
    style={[
      {
        top,
        left,
      },
      style,
    ]}>
    {children}
  </Animated.View>
);

const CategoryModal = ({
  visible,
  onClose,
  options,
  onSelect,
  position,
}: CategoryModalProps) => {
  const handleSelect = (value: number) => {
    onSelect(value);
    onClose();
  };

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (visible && Platform.OS === 'android') {
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      backdropOpacity.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && Platform.OS === 'android') {
      const timer = setTimeout(() => {
        setShowList(true);
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }, 120);

      return () => clearTimeout(timer);
    }

    setShowList(false);
    listOpacity.setValue(0);
  }, [visible]);

  if (Platform.OS === 'ios') {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}>
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            className="absolute rounded-[15px] bg-white px-[10px]"
            style={{
              top: position.top,
              left: position.left,
            }}>
            <CategoryList options={options} onSelect={handleSelect} />
          </View>
        </Pressable>
      </Modal>
    );
  }

  return (
    <Portal>
      {visible && (
        <>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              opacity: backdropOpacity,
            }}
          />
          <Pressable
            onPress={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <PopoverContainer
              top={position.top}
              left={position.left}
              style={{ opacity: listOpacity }}>
              {showList && (
                <CategoryList options={options} onSelect={handleSelect} />
              )}
            </PopoverContainer>
          </Pressable>
        </>
      )}
    </Portal>
  );
};

export default CategoryModal;
