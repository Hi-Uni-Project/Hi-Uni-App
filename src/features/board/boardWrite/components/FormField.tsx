import React from 'react';

import { View, Text, TextInput } from 'react-native';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  required?: boolean;
  height?: string;
}

export const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  required = false,
  height,
}: Props) => {
  const inputClassName = multiline
    ? `${height || 'h-16'} p-0 text-main-text typo-body-15-regular`
    : 'h-4 p-0 text-main-text typo-body-15-regular';

  const containerClassName = multiline
    ? 'mt-2 rounded-[15px] border border-surface-200 bg-white p-4'
    : 'mt-2 rounded-[15px] border border-surface-200 bg-white px-4 py-3';

  return (
    <View className="mb-6">
      <Text className="text-main-text typo-body-16-semibold">
        {label}
        {required && <Text className="text-primary-purple"> *</Text>}
      </Text>

      <View className={containerClassName}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#B7B7B7"
          value={value}
          onChangeText={onChangeText}
          className={inputClassName}
          multiline={multiline}
        />
      </View>
    </View>
  );
};
