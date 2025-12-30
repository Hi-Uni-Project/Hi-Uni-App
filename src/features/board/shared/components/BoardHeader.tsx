import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabKey } from '../types/BoardUpperTab';

import BoardUpperNavigator from '@/features/board/shared/components/BoardUpperNavigator';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import OptionPopup, { OptionItem } from '@/shared/components/Board/OptionPopup';
import { useRegisterStore } from '@/shared/stores/register';
import { shadowStyleSheet } from '@/shared/styles/shadow';
import MoreIcon from '@/static/icons/more.svg';
import SearchIcon from '@/static/icons/search.svg';

interface BoardHeaderProps {
  onTabPress?: (tabKey: TabKey) => void;
}

const TOP_OFFSET = Platform.OS === 'ios' ? 60 : 40;

const BoardHeader = ({ onTabPress }: BoardHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { univ } = useRegisterStore();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [isOptionVisible, setIsOptionVisible] = useState(false);

  const options: OptionItem[] = [
    {
      label: '내가 쓴 글 보기',
      onPress: () => {
        navigation.navigate('BoardRoute', { screen: 'MyPosts' });
      },
    },
    {
      label: '내가 댓글 단 글 보기',
      onPress: () => {
        navigation.navigate('BoardRoute', { screen: 'MyComments' });
      },
    },
  ];

  return (
    <View
      className="absolute left-0 right-0 top-0 z-10 bg-white"
      style={[{ height: insets.top + 110 }, shadowStyleSheet.dropShadowMedium]}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: insets.top }} />

      <View className="h-[70px] flex-row items-center justify-between">
        <Text className="ml-[21px] text-main-text typo-sub-title-20-medium">
          {univ.univName}
        </Text>

        <View className="mr-[10px] flex-row items-center">
          <TouchableOpacity className="p-[10px]">
            <SearchIcon
              width={26}
              height={26}
              color={'#1E2128'}
              onPress={() =>
                navigation.navigate('HomeRoute', { screen: 'HomeSearch' })
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-[10px]"
            onPress={() => setIsOptionVisible(true)}>
            <MoreIcon width={26} height={26} color={'#1E2128'} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-[40px]">
        <BoardUpperNavigator onTabPress={onTabPress} />
      </View>

      <OptionPopup
        visible={isOptionVisible}
        onClose={() => setIsOptionVisible(false)}
        options={options}
        position={{
          top: insets.top + TOP_OFFSET,
          right: 25,
        }}
      />
    </View>
  );
};

export default BoardHeader;
