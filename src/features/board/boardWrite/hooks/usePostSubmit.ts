import { createPost } from '../../api/createPost';
import { CreatePostRequest, PostData } from '../../api/types';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

interface UsePostSubmitProps {
  selectedPostType: PostType | null;
  title: string;
  content: string;
  navigation: any;
}

export const usePostSubmit = ({
  selectedPostType,
  title,
  content,
  navigation,
}: UsePostSubmitProps) => {
  const handleSubmit = async () => {
    try {
      const postData: CreatePostRequest = {
        title: title.trim(),
        content: content.trim(),
        type: selectedPostType!,
        imageUrl: '', // 임시
      };

      const responseData: PostData = await createPost(postData);
      (console.log(responseData), navigation.goBack());
    } catch (error: any) {
      console.error('게시글 작성 오류:', error);
    }
  };

  return {
    handleSubmit,
  };
};
