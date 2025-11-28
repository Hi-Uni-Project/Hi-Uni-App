import React from 'react';

import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import PostTypeSelector from './PostTypeSelector';
import ReviewCheckbox from './ReviewCheckbox';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

interface Props {
  selectedPostType: PostType | null;
  displayName: string;
  isDropdownOpen: boolean;
  title: string;
  content: string;
  isReview: boolean;
  placeholder: string;
  onPostTypeSelectorPress: () => void;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
  onReviewToggle: () => void;
}

const NormalWriteView = ({
  selectedPostType,
  displayName,
  isDropdownOpen,
  title,
  content,
  isReview,
  placeholder,
  onPostTypeSelectorPress,
  onTitleChange,
  onContentChange,
  onReviewToggle,
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 px-5 pt-7">
        <View className="border-b-[1.5px] border-b-surface-300">
          <View className="flex-row pb-3">
            <PostTypeSelector
              selectedPostType={selectedPostType}
              displayName={displayName}
              isDropdownOpen={isDropdownOpen}
              onPress={onPostTypeSelectorPress}
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
          description="후기 글의 경우 기록에 자동 저장되어 자기소개서가 \n자동으로 작성돼요."
        />

        <TextInput
          multiline
          value={content}
          onChangeText={onContentChange}
          placeholder={placeholder}
          placeholderTextColor="#b7b7b7"
          className="mt-5 h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 py-5 text-main-text typo-body-15-regular"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NormalWriteView;
