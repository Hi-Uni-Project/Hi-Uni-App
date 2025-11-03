import React from 'react';

import { View, FlatList, Platform } from 'react-native';

import SectionTitle from '../../shared/components/SectionTitle';
import BoardPostCardMocks from '../../shared/mocks/BoardPostCardMocks';

import BoardPostCardLG from '@/shared/components/Board/BoardPostCard/lg';

interface Props {
  onPress?: () => void;
  title: string;
}

const PopularJobInfoReview = ({ onPress, title }: Props) => {
  const mockData = BoardPostCardMocks;

  return (
    <View className="bg-primary-purple pb-5 pt-[23px]">
      <SectionTitle onPress={onPress} title={title} />
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        nestedScrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          Platform.OS === 'android' ? { paddingRight: 20 } : {}
        }
        className="flex-row px-5"
        renderItem={({ item }) => (
          <View className="mr-4" key={item.id}>
            <BoardPostCardLG
              company={item.company}
              period={item.period}
              position={item.position}
              jobType={item.jobType}
              title={item.title}
              content={item.content}
              author={item.author}
              major={item.major}
              time={item.time}
              likes={item.likes}
              comments={item.comments}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PopularJobInfoReview;
