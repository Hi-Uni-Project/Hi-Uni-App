import React from 'react';

import { styled } from 'nativewind';
import { View, TextInput } from 'react-native';

const StyledView = styled(View);
const StyledInput = styled(TextInput);

const SearchBar: React.FC = () => (
  <StyledView className="ml-8 mt-20 h-[52px] w-[350px] items-center justify-center rounded-full bg-[#F2F2F2]">
    <StyledInput
      className="h-full w-full bg-transparent px-4 text-base font-normal leading-6"
      placeholder="학과명을 입력해주세요"
      placeholderTextColor="#979797"
    />
  </StyledView>
);

export default SearchBar;
