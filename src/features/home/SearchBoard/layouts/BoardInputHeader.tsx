import React, { RefObject } from 'react';

import { Pressable, TextInput, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import { shadowStyleSheet } from '@/shared/styles/shadow';
import HUInput from '@/shared/ui/atoms/HUInput';

interface Props {
  inputRef: RefObject<TextInput>;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
  onClose: () => void;
  onBackPress: () => void;
}

const BoardInputHeader = ({
  inputRef,
  searchText,
  onSearchTextChange,
  onSubmitEditing,
  onFocus,
  onClose,
  onBackPress,
}: Props) => {
  return (
    <View
      className="h-[10%] justify-end bg-white"
      style={shadowStyleSheet.dropShadowBottom}>
      <View className="mb-[10px] flex-row items-center justify-between px-5">
        <Pressable onPress={onBackPress}>
          <ArrowIcons direction="left" width={24} height={20} color="#1E2128" />
        </Pressable>

        <View className="w-[315px]">
          <HUInput
            ref={inputRef}
            placeholder="글 제목 혹은 내용을 입력하세요"
            variant="find"
            value={searchText}
            onChangeText={onSearchTextChange}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
            onPress={onClose}
            maxLength={15}
            length={searchText.length}
          />
        </View>
      </View>
    </View>
  );
};

export default BoardInputHeader;
