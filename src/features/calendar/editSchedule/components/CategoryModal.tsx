import React, { useEffect } from 'react';

import { Portal } from '@gorhom/portal';
import { Modal, View, Text, Pressable, Platform, Animated } from 'react-native';

import { Category } from '@/shared/types/categoryType';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  options: Category[];
  onSelect: (value: number) => void;
  position: { top: number; left: number };
}

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

  const backdropOpacity = React.useRef(new Animated.Value(0)).current;
  const listOpacity = React.useRef(new Animated.Value(0)).current;

  const [showList, setShowList] = React.useState(false);

  React.useEffect(() => {
    if (visible && Platform.OS === 'android') {
      const timer = setTimeout(() => {
        setShowList(true);
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }, 100);
      return () => clearTimeout(timer);
    }
    setShowList(false);
    listOpacity.setValue(0);
  }, [visible]);

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

  if (Platform.OS === 'ios') {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={onClose}>
        <Pressable className="flex-1 bg-black/40" onPress={onClose}>
          <View
            className="absolute rounded-[15px] bg-white px-[10px]"
            style={{
              top: position.top,
              left: position.left,
            }}>
            {options.map((option, index) => (
              <Pressable
                key={option.categoryId}
                className={'w-[123px]'}
                onPress={() => handleSelect(option.categoryId)}>
                <View
                  className={`flex-row items-center pb-[14px] pt-[15px] ${
                    index !== options.length - 1 ? 'border-b-[1px]' : ''
                  } border-b-surface-200`}>
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
          </View>
        </Pressable>
      </Modal>
    );
  } else {
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
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
              <Animated.View
                className="absolute rounded-[15px] bg-white px-[10px]"
                style={{
                  top: position.top,
                  left: position.left,
                  opacity: listOpacity,
                }}>
                {showList &&
                  options.map((option, index) => (
                    <Pressable
                      key={option.categoryId}
                      className={'w-[123px]'}
                      onPress={() => handleSelect(option.categoryId)}>
                      <View
                        className={`flex-row items-center pb-[14px] pt-[15px] ${
                          index !== options.length - 1 ? 'border-b-[1px]' : ''
                        } border-b-surface-200`}>
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
              </Animated.View>
            </Pressable>
          </>
        )}
      </Portal>
    );
  }
};

export default CategoryModal;
