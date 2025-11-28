import React from 'react';

import { Pressable, Text } from 'react-native';

import { PostType } from '@/features/board/shared/types/enum/postEnum';
import ChevronIcons from '@/shared/icons/ChevronIcons';

interface Props {
  selectedPostType: PostType | null;
  displayName: string;
  isDropdownOpen: boolean;
  onPress: () => void;
}

const PostTypeSelector = ({
  selectedPostType,
  displayName,
  isDropdownOpen,
  onPress,
}: Props) => {
  return (
    <Pressable
      className={`flex-row items-center justify-center rounded-[20px] ${selectedPostType ? 'bg-primary-purple' : 'border border-surface-300'} px-3 py-0.5`}
      onPress={onPress}>
      <Text
        className={`mr-2 ${selectedPostType ? 'text-white' : 'text-surface-600'} typo-body-16-regular`}>
        {displayName}
      </Text>

      <ChevronIcons
        direction={isDropdownOpen ? 'top' : 'bottom'}
        width={11}
        height={9}
        color={selectedPostType ? '#ffffff' : '#b7b7b7'}
      />
    </Pressable>
  );
};

export default PostTypeSelector;
