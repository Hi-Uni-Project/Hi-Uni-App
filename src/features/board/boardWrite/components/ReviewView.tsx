import React from 'react';

import { View, TextInput, ScrollView } from 'react-native';

import PostTypeSelector from './PostTypeSelector';
import ReviewCheckbox from './ReviewCheckbox';
import ReviewTemplateSwitcher from './ReviewTemplateSwitcher';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

interface Props {
  selectedPostType: PostType | null;
  displayName: string;
  isDropdownOpen: boolean;
  title: string;
  isReview: boolean;
  reviewForm: any;
  editMode?: boolean;
  onPostTypeSelectorPress: () => void;
  onTitleChange: (text: string) => void;
  onReviewToggle: () => void;
}

const ReviewView = ({
  selectedPostType,
  displayName,
  isDropdownOpen,
  title,
  isReview,
  reviewForm,
  editMode = false,
  onPostTypeSelectorPress,
  onTitleChange,
  onReviewToggle,
}: Props) => {
  return (
    <ScrollView
      className="flex-1 px-5 pt-7"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      <View className="border-b-[1.5px] border-b-surface-300">
        <View className="flex-row pb-3">
          <PostTypeSelector
            selectedPostType={selectedPostType}
            displayName={displayName}
            isDropdownOpen={isDropdownOpen}
            onPress={onPostTypeSelectorPress}
            disabled={editMode}
          />

          <TextInput
            placeholder="제목을 입력해주세요."
            placeholderTextColor="#979797"
            value={title}
            onChangeText={onTitleChange}
            className="w-72 pl-4 text-main-text typo-sub-title-20-semibold"
          />
        </View>
      </View>

      <ReviewCheckbox
        isReview={isReview}
        onPress={onReviewToggle}
        disabled={editMode}
        description={
          '후기 글의 경우 기록에 자동 저장되어 포트폴리오,\n이력서, 자기소개서가 자동으로 작성돼요.'
        }
      />

      <ReviewTemplateSwitcher
        postType={selectedPostType}
        reviewForm={reviewForm}
      />
    </ScrollView>
  );
};

export default ReviewView;
