import {
  createPost,
  createReviewPost,
} from '../../boardDetail/api/post/createPost';
import {
  updateNoReviewPost,
  updateReviewPost,
} from '../../boardDetail/api/post/updatePost';
import { CreatePostRequest, PostData } from '../../boardDetail/api/types';
import { convertReviewFormToRequest } from '../../boardDetail/api/util/convertReviewFormToRequest';
import { ReviewFormData } from '../types';

import { PostType } from '@/features/board/shared/types/enum/postEnum';
import { BoardStackNavigationProp } from '@/navigation/types/navigationTypes';

interface UsePostSubmitProps {
  selectedPostType: PostType | null;
  title: string;
  content: string;
  navigation: BoardStackNavigationProp;
  isReview: boolean;
  reviewFormData?: ReviewFormData;
  editMode?: boolean;
  postId?: number;
}

export const usePostSubmit = ({
  selectedPostType,
  title,
  content,
  navigation,
  isReview,
  reviewFormData,
  editMode = false,
  postId,
}: UsePostSubmitProps) => {
  const handleSubmit = async () => {
    try {
      if (editMode && postId) {
        // 수정 모드
        if (isReview && reviewFormData) {
          const requestData = convertReviewFormToRequest(
            title.trim(),
            selectedPostType!,
            reviewFormData,
          );
          await updateReviewPost(postId, requestData);
        } else {
          await updateNoReviewPost(
            postId,
            title.trim(),
            content.trim(),
            selectedPostType!,
          );
        }
      } else {
        // 작성 모드
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

        console.log(responseData);
      }

      navigation.goBack();
    } catch (error: any) {
      console.error('게시글 작성/수정 오류:', error);
    }
  };

  return {
    handleSubmit,
  };
};
