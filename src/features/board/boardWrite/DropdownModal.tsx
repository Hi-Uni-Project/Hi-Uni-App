import React from 'react';

import { Modal, View, Text, Pressable } from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownModalProps {
  visible: boolean;
  onClose: () => void;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  position: { top: number; left: number };
  triggerButton?: React.ReactNode; // 트리거 버튼 추가
}

const DropdownModal = ({
  visible,
  onClose,
  options,
  onSelect,
  position,
  triggerButton,
}: DropdownModalProps) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        {/* Trigger Button - 백드롭 위에 렌더링 */}
        {triggerButton && (
          <View
            className="absolute"
            style={{
              top: position.top - 42, // 드롭다운 위치에서 버튼 높이만큼 위
              left: position.left,
            }}>
            {triggerButton}
          </View>
        )}

        {/* Dropdown Menu */}
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
              onPress={() => handleSelect(option.value)}>
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
