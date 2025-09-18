import React, { useState } from 'react';

import { View, Text, StyleSheet, Pressable } from 'react-native';

import { Tab, TabKey } from '../types/BoardUpperTab';

import tabItems from '@/features/board/shared/constants/tabItems';

const styles = StyleSheet.create({
  activeTabBorder: {
    borderBottomWidth: 4,
    borderBottomColor: '#1E2128',
    borderRadius: 4,
  },
});

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
          <View style={[activeTab === tab.key && styles.activeTabBorder]} />
        </Pressable>
      ))}
    </View>
  );
};

export default BoardUpperNavigator;
