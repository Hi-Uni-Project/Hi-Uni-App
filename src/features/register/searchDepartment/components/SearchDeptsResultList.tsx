import React from 'react';

import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Department } from '../types';

import HighlightedText from '@/features/register/shared/components/HighlightedText';
import ToggleIcons from '@/shared/icons/ToggleIcons';

interface Props {
  filteredDepts: Department[];
  handleSelectDept: (major: string) => void;
  inputValue: string;
  selectedDepts: string[];
}

const SearchDeptsResultList = ({
  filteredDepts,
  handleSelectDept,
  inputValue,
  selectedDepts,
}: Props) => {
  return (
    <View className="mt-[18px] flex-1 px-8">
      <FlatList
        data={filteredDepts}
        keyExtractor={(item, index) => `${item.majorName}-${index}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectDept(item.majorName)}
            className="py-[10px]">
            <HighlightedText
              text={item.majorName}
              highlightText={inputValue}
              selected={selectedDepts.includes(item.majorName)}
            />
            {selectedDepts.includes(item.majorName) && (
              <View className="absolute right-[14px] top-1/2 -translate-y-1/2">
                <ToggleIcons
                  type="check"
                  color="#1E2128"
                  width={18}
                  height={18}
                />
              </View>
            )}
            <Text className="text-surface-500 typo-caption-12-light">
              {item.collegeName}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default SearchDeptsResultList;
