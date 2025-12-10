import React from 'react';

import { View, Pressable, ScrollView, ActivityIndicator } from 'react-native';

import { Skill } from '../types/domainType';

import HighlightedText from '@/features/register/shared/components/HighlightedText';
import { shadowStyleSheet } from '@/shared/styles/shadow';

interface Props {
  results: Skill[];
  searchKeyword: string;
  selectedSkillIds: (number | null)[];
  onSelectSkill: (skill: Skill) => void;
  isLoading?: boolean;
}

const ITEM_HEIGHT = 44;
const MAX_VISIBLE_ITEMS = 4.5;

const SkillSearchResultList = ({
  results,
  searchKeyword,
  selectedSkillIds,
  onSelectSkill,
  isLoading = false,
}: Props) => {
  if (isLoading) {
    return (
      <View
        className="mt-2 items-center justify-center rounded-[15px] border border-surface-200 bg-white"
        style={{ height: ITEM_HEIGHT * 2 }}>
        <ActivityIndicator size="small" color="#7248D9" />
      </View>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <View
      className="mb-2 mt-1 overflow-hidden rounded-[15px] border border-surface-300 bg-white"
      style={[
        { maxHeight: ITEM_HEIGHT * MAX_VISIBLE_ITEMS },
        shadowStyleSheet.dropShadow,
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        {results.map(skill => {
          const isSelected = selectedSkillIds.includes(skill.skillId);
          return (
            <Pressable
              key={skill.skillId}
              onPress={() => onSelectSkill(skill)}
              className="justify-center px-4"
              style={{ height: ITEM_HEIGHT }}>
              <HighlightedText
                text={skill.name}
                highlightText={searchKeyword}
                selected={isSelected}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SkillSearchResultList;
