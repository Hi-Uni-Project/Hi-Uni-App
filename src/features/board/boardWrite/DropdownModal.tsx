import React from 'react';

import { Modal, View, Text, Pressable } from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface Props {
  visible: boolean;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  position: { top: number; left: number };
}

const DropdownModal = ({ visible, options, onSelect, position }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable className="flex-1 bg-black/40">
        <View
          className="absolute space-y-2.5 rounded-[15px] bg-white p-2.5 shadow-lg"
          style={{
            top: position.top,
            left: position.left,
          }}>
          {options.map((option, index) => (
            <Pressable
              key={option.value}
              className={`w-[90px] ${index !== options.length - 1 && 'border-b-[1.5px]'} border-b-surface-200`}
              onPress={() => onSelect(option.value)}>
              <Text
                className={`${option.label === '자격증' ? 'pb-1' : 'pb-2'} text-main-text typo-body-16-regular`}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default DropdownModal;
