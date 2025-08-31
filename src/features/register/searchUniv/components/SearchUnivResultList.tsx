import React from 'react';

import { View, FlatList, Pressable } from 'react-native';

import HighlightedText from '../../shared/components/HighlightedText';

interface Props {
  filteredUnivs: string[];
  handleUnivChange: (univ: string, isSelect?: boolean) => void;
  inputValue: string;
}

const SearchUnivResultList = ({
  filteredUnivs,
  handleUnivChange,
  inputValue,
}: Props) => {
  return (
    <View className="mt-[18px] px-7">
      <FlatList
        data={filteredUnivs}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleUnivChange(item, true)}
            className="flex-row items-center py-3">
            <View className="mr-[10px] h-[30px] w-[30px] rounded-full bg-[#D9D9D9]" />
            <HighlightedText text={item} highlightText={inputValue} />
          </Pressable>
        )}
      />
    </View>
  );
};

export default SearchUnivResultList;
