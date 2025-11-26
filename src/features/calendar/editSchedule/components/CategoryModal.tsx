import React from 'react';

import { Modal, View, Text, Pressable } from 'react-native';

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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
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
                className={`flex-row items-center pb-[14px] pt-[15px] ${index !== options.length - 1 ? 'border-b-[1px]' : ''} border-b-surface-200`}>
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
};

export default CategoryModal;
