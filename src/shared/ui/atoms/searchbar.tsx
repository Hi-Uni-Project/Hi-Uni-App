import { useState } from 'react';

import { styled } from 'nativewind';
import { View, TextInput } from 'react-native';

const StyledView = styled(View);
const StyledInput = styled(TextInput);

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <StyledView className="h-[52px] w-[350px] items-center rounded-[100px] bg-[#F2F2F2]">
      <StyledInput
        value={searchText}
        onChangeText={setSearchText}
        className="typo-body-16-regular"
        placeholder="학과명을 입력해주세요"
        placeholderTextColor="#979797"
      />
    </StyledView>
  );
};

export default SearchBar;
