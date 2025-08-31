import React from 'react';

import { View, Text, Pressable } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  selectedDepts: string[];
  handleRemoveDept: (major: string) => void;
}

const SelectedDeptsList = ({ selectedDepts, handleRemoveDept }: Props) => {
  return (
    <View className="flex-row flex-wrap gap-[7px] self-start">
      {selectedDepts.map(major => (
        <View
          key={major}
          className="flex-row items-center rounded-full border-[1.5px] border-[#D9D9D9] px-3 py-[6px]">
          <Text className="mr-[7px] text-surface-700 typo-body-14-semibold">
            {major}
          </Text>
          <Pressable onPress={() => handleRemoveDept(major)}>
            <ActionIcons
              type="erase"
              color={'#DADADA'}
              width={14}
              height={14}
            />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default SelectedDeptsList;
