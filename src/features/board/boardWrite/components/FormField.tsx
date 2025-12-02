import React from 'react';

import { View, Text, TextInput, Platform } from 'react-native';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  required?: boolean;
  height?: number;
}

export const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  required = false,
  height = 72,
}: Props) => {
  return (
    <View className="mb-6">
      <Text className="text-main-text typo-body-16-semibold">
        {label}
        {required && <Text className="text-primary-purple"> *</Text>}
      </Text>

      <View className="mt-2 rounded-[15px] border border-surface-200 bg-white px-4 py-3">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#B7B7B7"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          className="text-main-text typo-body-15-regular"
          style={{
            height: multiline ? height : 22, // 모든 단일 행에 고정 높이
            padding: 0,
            margin: 0,
            ...(Platform.OS === 'android' && {
              textAlignVertical: multiline ? 'top' : 'center',
            }),
          }}
        />
      </View>
    </View>
  );
};
