import React, { useState } from 'react';

import { View, Text, Pressable } from 'react-native';

import NavIndicatorStyles from '../styles/navIndicator';
import { Tab, TabKey } from '../types/BoardUpperTab';

import tabItems from '@/features/board/shared/constants/tabItems';

interface BoardUpperNavigatorProps {
  onTabPress?: (tabKey: TabKey) => void;
}

const BoardUpperNavigator = ({ onTabPress }: BoardUpperNavigatorProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('jobInfo');
  const tabs: Tab[] = tabItems;

  const handlePress = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    onTabPress && onTabPress(tabKey);
  };

  return (
    <View className="ml-[20px] h-full w-[100px] flex-row items-end">
      {tabs.map(tab => (
        <Pressable key={tab.key} onPress={() => handlePress(tab.key)}>
          <Text className="mb-2 typo-sub-title-20-semibold">{tab.title}</Text>
          <View
            style={[
              activeTab === tab.key && NavIndicatorStyles.activeTabBorder,
            ]}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default BoardUpperNavigator;
