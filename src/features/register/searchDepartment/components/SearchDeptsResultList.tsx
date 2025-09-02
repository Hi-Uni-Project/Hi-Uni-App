import React from 'react';

import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import HighlightedText from '@/features/register/shared/components/HighlightedText';
import ToggleIcons from '@/shared/icons/ToggleIcons';

interface Props {
  filteredDepts: {
    major: string;
    college: string;
  }[];
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
        className="flex-1"
        data={filteredDepts}
        keyExtractor={(item, index) => `${item.major}-${index}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectDept(item.major)}
            className="py-[10px]">
            <HighlightedText
              text={item.major}
              highlightText={inputValue}
              selected={selectedDepts.includes(item.major)}
            />
            {selectedDepts.includes(item.major) && (
              <View className="absolute right-[14px] top-1/2 -translate-y-1/2">
                <ToggleIcons
                  type="check"
                  color="#1E2128"
                  width={18}
                  height={18}
                />
              </View>
            )}
            <Text className="text-surface-500 typo-body-12-light">
              {item.college}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default SearchDeptsResultList;
