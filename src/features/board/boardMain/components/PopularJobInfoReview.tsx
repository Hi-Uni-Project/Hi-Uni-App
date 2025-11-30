import React from 'react';

import { View, FlatList, Platform, Pressable } from 'react-native';

import SectionTitle from '../../shared/components/SectionTitle';
import { Post } from '../../shared/types/DefaultPostType';

import BoardPostCardLG from '@/shared/components/Board/BoardPostCard/lg';
import Loading from '@/shared/ui/organisms/Loading';

interface Props {
  posts: Post[];
  onPress: () => void;
  title: string;
  isLoading: boolean;
}

const PopularJobInfoReview = ({ posts, onPress, title, isLoading }: Props) => {
  if (isLoading) {
    return (
      <View className="bg-primary-purple pb-5 pt-[23px]">
        <Loading />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} className="pt-[17px]">
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
