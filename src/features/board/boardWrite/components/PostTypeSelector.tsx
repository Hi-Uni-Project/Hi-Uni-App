import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { PostType } from '@/features/board/shared/types/enum/postEnum';
import ChevronIcons from '@/shared/icons/ChevronIcons';

interface Props {
  selectedPostType: PostType | null;
  displayName: string;
  isDropdownOpen: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const PostTypeSelector = ({
  selectedPostType,
  displayName,
  isDropdownOpen,
  onPress,
  disabled = false,
}: Props) => {
  return (
    <View className="items-center justify-center">
      <Pressable
        className={`flex-row items-center justify-center rounded-[20px] ${selectedPostType ? 'bg-primary-purple' : 'border border-surface-300'} h-8 px-3`}
        onPress={onPress}
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}>
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
    </View>
  );
};

export default PostTypeSelector;
