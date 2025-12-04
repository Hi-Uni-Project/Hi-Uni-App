import React from 'react';

import { Text, TextInput, View } from 'react-native';

interface TitleSectionProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const TitleSection = ({ title, onTitleChange }: TitleSectionProps) => {
  return (
    <View className="mt-6 px-5">
      <Text className="typo-body-17-semibold">
        이력서 제목
        <Text className="text-primary-purple typo-body-17-semibold">*</Text>
      </Text>
      <TextInput
        className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
        placeholder="이력서 제목을 입력해주세요"
        onChangeText={onTitleChange}
        value={title}
        placeholderTextColor={'#B7B7B7'}
      />
    </View>
  );
};

export default TitleSection;
