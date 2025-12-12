import {
  createPost,
  createReviewPost,
} from '../../boardDetail/api/post/createPost';
import { CreatePostRequest, PostData } from '../../boardDetail/api/types';
import { ReviewFormData } from '../types';

import { PostType } from '@/features/board/shared/types/enum/postEnum';
import { HomeStackNavigationProp } from '@/navigation/types/navigationTypes';

interface UsePostSubmitProps {
  selectedPostType: PostType | null;
  title: string;
  content: string;
  navigation: HomeStackNavigationProp;
  isReview: boolean;
  reviewFormData?: ReviewFormData;
}

export const usePostSubmit = ({
  selectedPostType,
  title,
  content,
  navigation,
  isReview,
  reviewFormData,
}: UsePostSubmitProps) => {
  const handleSubmit = async () => {
    try {
      let responseData: PostData;

      if (isReview && reviewFormData) {
        responseData = await createReviewPost(
          title.trim(),
          selectedPostType!,
          reviewFormData,
        );
      } else {
        const postData: CreatePostRequest = {
          title: title.trim(),
          content: content.trim(),
          type: selectedPostType!,
        };
        responseData = await createPost(postData);
      }

      (console.log(responseData), navigation.goBack());
    } catch (error: any) {
      console.error('게시글 작성 오류:', error);
    }
  };

  return {
    handleSubmit,
  };
};
