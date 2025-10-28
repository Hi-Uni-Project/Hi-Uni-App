import React from 'react';

import { View, FlatList, Platform } from 'react-native';

import BoardPostCardMocks from '@/features/board/mocks/BoardPostCardMocks';
import SectionTitle from '@/features/board/shared/components/SectionTitle';
import BoardPostCardLG from '@/shared/components/Board/BoardPostCard/lg';

interface Props {
  onPress?: () => void;
}

const PopularJobInfoReview = ({ onPress }: Props) => {
  const mockData = BoardPostCardMocks;

  return (
    <View className="bg-primary-purple pb-5 pt-[23px]">
      <SectionTitle onPress={onPress} />
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
