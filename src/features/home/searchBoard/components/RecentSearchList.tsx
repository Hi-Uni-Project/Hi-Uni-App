import React from 'react';

import { View, Text, Pressable } from 'react-native';

import NoRecent from './NoRecent';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  recentSearches: string[];
  handleRemoveItem: (item: string) => void;
  handleSelectItem: (item: string) => void;
}

const RecentSearchList = ({
  recentSearches,
  handleRemoveItem,
  handleSelectItem,
}: Props) => {
  return (
    <View style={{ maxHeight: 3 * 42 + 2 * 12 + 4, overflow: 'hidden' }}>
      <View className="flex-row flex-wrap gap-2 gap-y-3 pb-1 pt-1">
        {recentSearches.length === 0 ? (
          <NoRecent />
        ) : (
          recentSearches.map(item => (
            <Pressable
              onPress={() => handleSelectItem(item)}
              key={item}
              className="flex-row items-center rounded-[20px] border border-surface-300 px-4 py-2">
              <Text className="mr-2 text-surface-600 typo-body-16-regular">
                {item}
              </Text>
              <Pressable onPress={() => handleRemoveItem(item)}>
                <ActionIcons
                  type="close"
                  height={12}
                  width={12}
                  color="#6E6E6E"
                />
              </Pressable>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
};

export default RecentSearchList;
