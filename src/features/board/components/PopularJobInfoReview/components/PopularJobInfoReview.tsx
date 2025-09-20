import React from 'react';

import { View, Text, FlatList, Platform } from 'react-native';
import { Pressable } from 'react-native';

import BoardPostCardMocks from '@/features/board/mocks/BoardPostCardMocks';
import BoardPostCardLG from '@/shared/components/BoardPostCard/lg';
import ChevronIcons from '@/shared/icons/ChevronIcons';
import FireIcon from '@/static/icons/fire.svg';

const SectionTitle = () => {
  return (
    <View className="mb-5 flex-row items-center justify-between px-5">
      <View className="flex-row items-center">
        <FireIcon width={18} height={20} color={'#ffffff'} />
        <Text
          className="ml-2 text-white typo-sub-title-20-semibold"
          style={{ fontWeight: '700' }}>
          전체 취업 정보 인기 후기
        </Text>
      </View>
      <Pressable className="flex-row items-center">
        <Text className="mr-2 text-surface-300 typo-caption-14-regular">
          더 보기
        </Text>
        <ChevronIcons direction="right" width={6} height={10} color="#B7B7B7" />
      </Pressable>
    </View>
  );
};

const PopularJobInfoReview = () => {
  const mockData = BoardPostCardMocks;

  return (
    <View className="bg-primary-purple pb-5 pt-[23px]">
      <SectionTitle />
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
