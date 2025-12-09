import React from 'react';

import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import { shadowStyleSheet } from '@/shared/styles/shadow';

export interface OptionItem {
  label: string;
  onPress: () => void;
}

interface OptionPopupProps {
  visible: boolean;
  onClose: () => void;
  options: OptionItem[];
  position?: { top?: number; right?: number; left?: number; bottom?: number };
}

const OptionPopup = ({
  visible,
  onClose,
  options,
  position = { top: 60, right: 10 },
}: OptionPopupProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1">
          <TouchableWithoutFeedback>
            <View
              className="absolute rounded-2xl bg-white px-4 py-4"
              style={[shadowStyleSheet.dropShadowMedium, position]}>
              {options.map((option, index) => (
                <View key={index}>
                  <Pressable
                    onPress={() => {
                      option.onPress();
                      onClose();
                    }}>
                    <Text className="text-main-text typo-body-15-medium">
                      {option.label}
                    </Text>
                  </Pressable>
                  {index < options.length - 1 && (
                    <View className="mb-3 mt-3 w-[120px] border-b-[1.5px] border-b-gray-200" />
                  )}
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionPopup;
