import React from 'react';

import { Text, View } from 'react-native';

import SelectedSkillsList from '@/features/record/editResume/components/SelectedSkillsList';
import SkillSearchInput from '@/features/record/editResume/components/SkillSearchInput';
import SkillSearchResultList from '@/features/record/editResume/components/SkillSearchResultList';
import { Skill } from '@/features/record/editResume/types/domainType';

interface SkillSectionProps {
  skills: Skill[];
  inputValue: string;
  searchKeyword: string;
  searchResults: Array<{ skillId: number; name: string }>;
  isLoading: boolean;
  isSearchResultVisible: boolean;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;
  onSelectSkill: (skill: { skillId: number; name: string }) => void;
  onRemoveSkill: (skillName: string) => void;
}

const SkillSection = ({
  skills,
  inputValue,
  searchKeyword,
  searchResults,
  isLoading,
  isSearchResultVisible,
  onInputChange,
  onSearch,
  onClearSearch,
  onSelectSkill,
  onRemoveSkill,
}: SkillSectionProps) => {
  return (
    <View className="mt-[40px] px-5">
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="typo-body-17-semibold">스킬</Text>
      </View>

      <SkillSearchInput
        value={inputValue}
        onChangeText={onInputChange}
        onSubmit={onSearch}
        onClear={onClearSearch}
      />

      {isSearchResultVisible && (
        <SkillSearchResultList
          results={searchResults}
          searchKeyword={searchKeyword}
          selectedSkillIds={skills.map(s => s.skillId)}
          onSelectSkill={onSelectSkill}
          isLoading={isLoading}
        />
      )}

      <SelectedSkillsList
        selectedSkills={skills}
        onRemoveSkill={onRemoveSkill}
      />
    </View>
  );
};

export default SkillSection;
