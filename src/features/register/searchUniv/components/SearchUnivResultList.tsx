import React from 'react';

import { View, FlatList, Pressable } from 'react-native';

import HighlightedText from '../../shared/components/HighlightedText';
import { University } from '../types';

interface Props {
  filteredUnivs: University[];
  handleUnivChange: (univ: string, isSelect?: boolean) => void;
  inputValue: string;
}

const SearchUnivResultList = ({
  filteredUnivs,
  handleUnivChange,
  inputValue,
}: Props) => {
  return (
    <View className="mt-[18px] flex-1 px-8">
      <FlatList
        data={filteredUnivs}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleUnivChange(item.univName, true)}
            className="flex-row items-center py-3">
            <View className="mr-[10px] h-[30px] w-[30px] rounded-full bg-[#D9D9D9]" />
            <HighlightedText text={item.univName} highlightText={inputValue} />
          </Pressable>
        )}
      />
    </View>
  );
};

export default SearchUnivResultList;
