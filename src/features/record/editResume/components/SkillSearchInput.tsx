import React from 'react';

import { TextInput, View, Pressable } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  placeholder?: string;
}

const SkillSearchInput = ({
  value,
  onChangeText,
  onSubmit,
  onClear,
  placeholder = '내 스킬을 입력하여 추가하세요',
}: Props) => {
  return (
    <View className="h-[60px] w-full flex-row items-center rounded-full bg-[#F2F2F2]">
      <View className="absolute left-[20px]">
        <ActionIcons type="search" width={17} height={17} color="#979797" />
      </View>

      <TextInput
        className="flex-1 pl-11 text-[16px] font-normal text-secondary-black"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#979797"
        returnKeyType="search"
        maxLength={18}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <Pressable onPress={onClear} className="absolute right-[17px]">
          <ActionIcons type="erase" width={17} height={17} color="#DADADA" />
        </Pressable>
      )}
    </View>
  );
};

export default SkillSearchInput;
