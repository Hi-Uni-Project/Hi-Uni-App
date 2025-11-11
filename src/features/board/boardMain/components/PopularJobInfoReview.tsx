import React from 'react';

import { View, FlatList, Platform, Pressable } from 'react-native';

import SectionTitle from '../../shared/components/SectionTitle';
import {
  getPostTypeByDisplayName,
  PostCategory,
} from '../../shared/types/enum/postEnum';
import { useCategoryWeeklyHotQuery } from '../hooks/useWeeklyHotQuery';

import BoardPostCardLG from '@/shared/components/Board/BoardPostCard/lg';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  title: string;
  onPress?: () => void;
}

const PopularJobInfoReview = ({ title, onPress }: Props) => {
  const selectedPostType = getPostTypeByDisplayName(title);

  const { data: posts = [], isLoading } = useCategoryWeeklyHotQuery(
    PostCategory.JOB_INFORMATION,
    selectedPostType,
  );

  if (isLoading) {
    return (
      <View className="bg-primary-purple pb-5 pt-[23px]">
        <Loading />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <View className="bg-primary-purple pb-5 pt-[23px]">
        <SectionTitle title={`${title} 인기 후기`} onPress={onPress} />
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            Platform.OS === 'android' ? { paddingRight: 20 } : {}
          }
          className="flex-row px-5"
          renderItem={({ item }) => (
            <View className="mr-4">
              <BoardPostCardLG
                {...item}
                onPress={() => console.log('Card clicked:', item.title)}
              />
            </View>
          )}
        />
      </View>
    </Pressable>
  );
};

export default PopularJobInfoReview;
