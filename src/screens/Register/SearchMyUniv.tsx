import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import SearchUnivResultList from '@/features/register/searchUniv/components/SearchUnivResultList';
import { useSearchUniv } from '@/features/register/searchUniv/hooks/useSearchUniv';
import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import { SignupStackNavigationProp } from '@/navigation/types/navigationTypes';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';
import HUInput from '@/shared/ui/atoms/HUInput';

const SearchMyUnivScreen = () => {
  const navigation = useNavigation<SignupStackNavigationProp>();
  const {
    inputValue,
    selectedUniv,
    filteredUnivs,
    handleUnivChange,
    handleEraseInput,
    handleNavigation,
  } = useSearchUniv(navigation);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScreenLayout>
        <HeaderWithBack flow screen="1" />

        <RegisterDefaultLayout>
          <RegisterHeader
            main="학교 인증을 위한 정보를 받아볼게요."
            sub="어느 학교에 다니고 계신가요?"
          />

          <View className="mt-[17px] items-center px-5">
            <HUInput
              value={inputValue}
              onChangeText={text => handleUnivChange(text)}
              onPress={handleEraseInput}
              variant="find"
              length={inputValue.length}
              placeholder="최소 2글자 이상의 학교명을 입력해주세요"
            />
          </View>

          {!selectedUniv && (
            <SearchUnivResultList
              filteredUnivs={filteredUnivs}
              handleUnivChange={handleUnivChange}
              inputValue={inputValue}
            />
          )}
        </RegisterDefaultLayout>

        <HUButton
          text="다음으로"
          className="self-center"
          disabled={!selectedUniv}
          onPress={handleNavigation}
        />
      </ScreenLayout>
    </TouchableWithoutFeedback>
  );
};

export default SearchMyUnivScreen;
