import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import HotPostWidgetItem from './HotPostItem';
import HotPostsWidgetTitle from './HotPostsWidgetTitle';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { HomeStackNavigationProp } from '@/navigation/types/navigationTypes';
import CardView from '@/shared/components/CardView';
import SectionHeader from '@/shared/components/layouts/SectionHeader';
import Loading from '@/shared/ui/organisms/Loading';

const Separator = () => <View className="h-[1px] bg-surface-200" />;

interface Props {
  hotPosts: Post[];
  isLoading: boolean;
}

const HotPostsWidget = ({ hotPosts, isLoading }: Props) => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  return (
    <Animated.View layout={LinearTransition} className="mt-8">
      <SectionHeader
        titleComponent={<HotPostsWidgetTitle />}
        onPressMore={() => {
          navigation.navigate('HotBoard');
        }}
      />
      <CardView className="mx-5">
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={hotPosts.filter((_, index) => index < 4)}
            renderItem={({ item }) => <HotPostWidgetItem item={item} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={Separator}
            scrollEnabled={false}
          />
        )}
      </CardView>
    </Animated.View>
  );
};

export default HotPostsWidget;
