import React, { useState } from 'react';

import clsx from 'clsx';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OptionPopup, { OptionItem } from '@/shared/components/Board/OptionPopup';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import CommentActionIcons from '@/shared/icons/CommentActionIcons';
import ToggleIcons from '@/shared/icons/ToggleIcons';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import CommentArrowIcon from '@/static/icons/comment-arrow.svg';
import MoreIcon from '@/static/icons/more.svg';

const BoardDetailPosts = () => {
  const insets = useSafeAreaInsets();
  const [comment, setComment] = useState('');
  const [isPostOptionVisible, setIsPostOptionVisible] = useState(false);
  const [activeCommentOption, setActiveCommentOption] = useState<number | null>(
    null,
  );
  const [scrollY, setScrollY] = useState(0); // 스크롤 위치 추적
  const [commentLayouts, setCommentLayouts] = useState<{
    [key: number]: number;
  }>({}); // 각 댓글의 Y 위치
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const TOP_OFFSET = 70; // 헤더 높이

  // 게시글 옵션 메뉴
  const postOptions: OptionItem[] = [
    {
      label: '쪽지 보내기',
      onPress: () => {
        console.log('쪽지 보내기');
      },
    },
    {
      label: '신고하기',
      onPress: () => {
        console.log('신고하기');
      },
    },
    {
      label: '차단하기',
      onPress: () => {
        console.log('차단하기');
      },
    },
  ];

  // 댓글 옵션 메뉴
  const commentOptions: OptionItem[] = [
    {
      label: '수정하기',
      onPress: () => {
        console.log('댓글 수정하기');
      },
    },
    {
      label: '삭제하기',
      onPress: () => {
        setDeleteModalVisible(true);
      },
    },
  ];

  const post = {
    category: '인턴십 게시판',
    subcategory: '제주대학교',
    author: '익명',
    school: '컴퓨터공학과',
    date: '6/23 22:08',
    title: '카카오 6개월 인턴십 후기',
    content: `카카오에서 UI 디자이너 인턴 했던 거 공유해볼게!!
앞단 디자이너들이랑 일하면서 느낀 건, 디자인은 그냥 화면 예쁘게 만드는 게 아니라 '사용자 입장에서 진짜 필요한 걸 고민하고 해결하는' 일이라는 거였다. 디자인에 대해 적극적인 건 구독이면 카카오 같은 큰 서비스에서의 인턴은 정말 추천하는 경험이 될 거야.
나는 이 경험 덕분에 확실히 '아, 난 실무 디자이너로 계속 나아가고 싶다'는 확신이 들었어!`,
    views: 802,
    likes: 40,
    bookmarks: 35,
    commentCount: 3,
  };

  const comments = [
    {
      id: 1,
      author: '익명1',
      school: '경영학과',
      content: 'ㅠㅠ 이번에 너도 인턴 붙었는데 서류광탈 안하길...',
      date: '6/23 22:08',
      likes: 5,
    },
    {
      id: 2,
      author: '익명2',
      school: '산업디자인학과',
      content: '댓글을 입력하세요.',
      date: '6/23 22:08',
      likes: 0,
      replies: [
        {
          id: 4,
          author: '익명3',
          school: '산업디자인학과',
          content: '저도 부타드려여 ㅠㅠㅠ',
          date: '6/23 22:08',
          likes: 2,
        },
        {
          id: 5,
          author: '익명3',
          school: '산업디자인학과',
          content:
            '저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ저도 부타드려여 ㅠㅠㅠ',
          date: '6/23 22:08',
        },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable>
            <ArrowIcons
              direction="left"
              width={26}
              height={26}
              color="#1E2128"
            />
          </Pressable>
          <View className="flex-1 items-center">
            <Text className="text-main-text typo-body-16-semibold">
              {post.category}
            </Text>
            <Text className="text-surface-500 typo-caption-14-medium">
              {post.subcategory}
            </Text>
          </View>
          <Pressable
            onPress={() => setIsPostOptionVisible(!isPostOptionVisible)}>
            <MoreIcon width={26} height={26} color={'#1E2128'} />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          setScrollY(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}>
        <View className="p-5">
          {/* Author Info */}
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 h-10 w-10 rounded-full bg-surface-300" />
            <View>
              <Text className="text-main-text typo-body-15-semibold">익명</Text>
              <Text className="text-surface-500 typo-caption-13-light">
                {post.school} · {post.date}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text className="mb-4 text-main-text typo-sub-title-20-semibold">
            {post.title}
          </Text>

          {/* Content */}
          <Text className="mb-6 leading-6 text-main-text typo-body-15-regular-post-detail">
            {post.content}
          </Text>

          {/* Stats */}
          <View className="mb-6 flex-row items-center justify-between space-x-6">
            <View className="flex-row items-center">
              <ToggleIcons
                type="eyeOpenStroke"
                color="#979797"
                width={24}
                height={24}
              />
              <Text className="ml-1 text-surface-500 typo-body-15-medium">
                {post.views}명이 봤어요
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Pressable className="flex-row items-center rounded-[50px] border-[1.5px] border-surface-200 px-3.5 py-1.5">
                <BoardActionIcons action="like-gray" width={20} height={20} />
                <Text className="ml-1 text-surface-600 typo-caption-14-semibold">
                  {post.likes}
                </Text>
              </Pressable>

              <Pressable className="flex-row items-center rounded-[50px] border-[1.5px] border-surface-200 px-3.5 py-1.5">
                <BoardActionIcons action="scrab-gray" width={20} height={20} />
                <Text className="ml-1 text-surface-600 typo-caption-14-semibold">
                  {post.bookmarks}
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            className="h-1.5 bg-surface-50"
            style={{ marginLeft: -20, marginRight: -20 }}
          />

          {/* Comments Section */}
          <View className="border-surface-200 pt-5">
            <Text className="mb-6 text-main-text typo-body-16-semibold">
              댓글 {post.commentCount}
            </Text>

            {comments.map((commentItem, idx) => (
              <View
                key={commentItem.id}
                className="pb-6"
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  setCommentLayouts(prev => ({
                    ...prev,
                    [commentItem.id]: layout.y,
                  }));
                }}>
                <View
                  className={clsx(
                    `${idx !== comments.length - 1 && 'border-b border-b-surface-200'} flex-col justify-between pb-6`,
                  )}>
                  <View className="w-full">
                    <View className="mb-3 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="mr-3 h-8 w-8 rounded-full bg-surface-300" />
                        <Text className="mr-2 text-main-text typo-caption-14-semibold">
                          {commentItem.author}
                        </Text>
                        <Text className="text-surface-500 typo-caption-14-regular">
                          · {commentItem.school}
                        </Text>
                      </View>

                      {/* comment box */}
                      <View className="flex-row items-center space-x-2 rounded-[100px] bg-surface-100 px-3 py-2">
                        <Pressable>
                          <CommentActionIcons
                            action="comment"
                            height={18}
                            width={18}
                          />
                        </Pressable>

                        <View className="h-3 w-[1px] bg-surface-300" />

                        <Pressable>
                          <CommentActionIcons
                            action="like"
                            height={18}
                            width={18}
                          />
                        </Pressable>

                        <View className="h-3 w-[1px] bg-surface-300" />

                        <Pressable
                          onPress={() =>
                            setActiveCommentOption(
                              activeCommentOption === commentItem.id
                                ? null
                                : commentItem.id,
                            )
                          }>
                          <CommentActionIcons
                            action="toggle"
                            height={18}
                            width={18}
                          />
                        </Pressable>
                      </View>
                    </View>

                    <Text className="mb-2 text-main-text typo-body-15-regular">
                      {commentItem.content}
                    </Text>

                    <View className="flex-row items-center space-x-2">
                      <Text className="text-surface-500 typo-caption-13-light">
                        {commentItem.date}
                      </Text>
                      {commentItem.likes > 0 && (
                        <View className="flex-row items-center">
                          <BoardActionIcons
                            width={14}
                            height={14}
                            action="like"
                          />
                          <Text className="ml-1 text-xs text-red-500">
                            {commentItem.likes}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {commentItem.replies &&
                    commentItem.replies.map(reply => (
                      <View className="flex-row space-x-2 px-5 pl-2 pt-4">
                        <CommentArrowIcon className="top-2" />

                        <View className="w-full flex-col rounded-[10px] bg-surface-100 p-3.5">
                          <View className="mb-3 flex-row justify-between">
                            <View className="flex-row items-center">
                              <View className="mr-3 h-8 w-8 rounded-full bg-surface-300" />
                              <Text className="mr-2 text-main-text typo-caption-14-semibold">
                                {commentItem.author}
                              </Text>
                              <Text className="text-surface-500 typo-caption-14-regular">
                                · {commentItem.school}
                              </Text>
                            </View>

                            <View className="flex-row items-center space-x-2 rounded-[100px] bg-surface-200 px-3 py-2">
                              <Pressable>
                                <CommentActionIcons
                                  action="like"
                                  height={18}
                                  width={18}
                                />
                              </Pressable>

                              <View className="h-3 w-[1px] bg-surface-300" />

                              <Pressable
                                onPress={() =>
                                  setActiveCommentOption(
                                    activeCommentOption === commentItem.id
                                      ? null
                                      : commentItem.id,
                                  )
                                }>
                                <CommentActionIcons
                                  action="toggle"
                                  height={18}
                                  width={18}
                                />
                              </Pressable>
                            </View>
                          </View>

                          <Text className="mb-2 text-main-text typo-body-15-regular">
                            {reply.content}
                          </Text>

                          <View className="flex-row items-center space-x-2">
                            <Text className="text-surface-500 typo-caption-13-light">
                              {reply.date}
                            </Text>
                            {reply.likes > 0 && (
                              <View className="flex-row items-center">
                                <BoardActionIcons
                                  width={14}
                                  height={14}
                                  action="like"
                                />
                                <Text className="ml-1 text-xs text-red-500">
                                  {reply.likes}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    ))}
                </View>

                {/* 댓글 옵션 팝업 */}
                <OptionPopup
                  visible={activeCommentOption === commentItem.id}
                  onClose={() => setActiveCommentOption(null)}
                  options={commentOptions}
                  position={{
                    top:
                      insets.top +
                      TOP_OFFSET +
                      (commentLayouts[commentItem.id] || 0) -
                      scrollY +
                      420,
                    right: 20,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Input Bar */}
      <View
        style={{ paddingBottom: insets.bottom }}
        className="border-t border-surface-200 bg-white p-4">
        <View className="flex-row items-center rounded-full bg-surface-100 px-4 py-2">
          <TextInput
            placeholder="저도 부타드려여 ㅠㅠㅠ"
            placeholderTextColor="#9CA3AF"
            value={comment}
            onChangeText={setComment}
            className="flex-1 text-main-text typo-body-15-regular"
          />
          <TouchableOpacity className="ml-2">
            {/* <Send width={20} height={20} color="#8B5CF6" /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Option Popup */}
      <OptionPopup
        visible={isPostOptionVisible}
        onClose={() => setIsPostOptionVisible(false)}
        options={postOptions}
        position={{
          top: insets.top + TOP_OFFSET,
          right: 30,
        }}
      />

      <ConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="댓글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={() => setDeleteModalVisible(false)}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </View>
  );
};

export default BoardDetailPosts;
