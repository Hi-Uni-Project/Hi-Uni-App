import React from 'react';

import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import DepsNotFoundButton from '@/features/register/searchDepartment/components/DepsNotFoundButton';
import SearchDeptsResultList from '@/features/register/searchDepartment/components/SearchDeptsResultList';
import SelectedDeptsList from '@/features/register/searchDepartment/components/SelectedDeptsList';
import useSearchDepartment from '@/features/register/searchDepartment/hooks/useSearchDepartment';
import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import { SKIP_DEPARTMENT_MODAL } from '@/features/register/shared/constants/skipDeptModalText';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';
import HUInput from '@/shared/ui/atoms/HUInput';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const SearchMyDepartment = () => {
  const {
    inputValue,
    setInputValue,
    selectedDepts,
    isModalVisible,
    setIsModalVisible,
    filteredDepts,
    handleSelectDept,
    handleRemoveDept,
  } = useSearchDepartment();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScreenLayout>
        <HeaderWithBack flow screen="2" />

        <RegisterDefaultLayout>
          <RegisterHeader
            main="신뢰있는 소통을 위해 프로필에 학과가 표시돼요."
            sub="어떤 학과에 속해있나요?"
          />

          <View className="items-center px-5 pt-[15px]">
            <SelectedDeptsList
              handleRemoveDept={handleRemoveDept}
              selectedDepts={selectedDepts}
            />

            <View className="mt-[12px]">
              <HUInput
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                onPress={() => setInputValue('')}
                variant="find"
                length={inputValue.length}
                placeholder="학과명을 입력해주세요"
              />
            </View>
          </View>

          <SearchDeptsResultList
            filteredDepts={filteredDepts}
            handleSelectDept={handleSelectDept}
            inputValue={inputValue}
            selectedDepts={selectedDepts}
          />
        </RegisterDefaultLayout>

        <DepsNotFoundButton setIsModalVisible={setIsModalVisible} />

        <HUButton
          text="다음으로"
          className="self-center"
          disabled={selectedDepts.length === 0}
          onPress={() => console.log('선택된 학과:', selectedDepts)}
        />

        <ConfirmModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={SKIP_DEPARTMENT_MODAL.title}
          description={SKIP_DEPARTMENT_MODAL.description}
          confirmText={SKIP_DEPARTMENT_MODAL.confirmText}
          cancelText={SKIP_DEPARTMENT_MODAL.cancelText}
          status="caution"
          onConfirm={() => (
            console.log('학과 선택 건너뜀'),
            setIsModalVisible(false)
          )}
          // 핸들링 함수 구현할 때 한번에 선언
        />
      </ScreenLayout>
    </TouchableWithoutFeedback>
  );
};

export default SearchMyDepartment;
