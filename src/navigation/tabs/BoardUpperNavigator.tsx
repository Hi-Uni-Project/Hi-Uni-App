import React, { useState } from 'react';

import { View, Text, StyleSheet, Pressable } from 'react-native';

const tabs = [
  { key: 'notice', title: '취업 정보' },
  { key: 'freeboard', title: '대외활동' },
];

const BoardUpperNavigator = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('notice');

  const handlePress = tabKey => {
    setActiveTab(tabKey);
    onTabPress && onTabPress(tabKey);
  };

  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <Pressable
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => handlePress(tab.key)}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}>
            {tab.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 54,
    width: 164,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'black',
  },
});

export default BoardUpperNavigator;
