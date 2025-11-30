import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { SkillResponse } from '../types/responseType';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  selectedSkills: SkillResponse[];
  onRemoveSkill: (skillId: number) => void;
}

const SelectedSkillsList = ({ selectedSkills, onRemoveSkill }: Props) => {
  if (selectedSkills.length === 0) {
    return null;
  }

  return (
    <View className="flex-row flex-wrap gap-[7px] pt-4">
      {selectedSkills.map(skill => (
        <View
          key={skill.skillId}
          className="flex-row items-center rounded-full border-[1.5px] border-[#D9D9D9] px-3 py-[6px]">
          <Text className="mr-[7px] text-surface-700 typo-caption-14-semibold">
            {skill.name}
          </Text>
          <Pressable onPress={() => onRemoveSkill(skill.skillId)}>
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

export default SelectedSkillsList;
