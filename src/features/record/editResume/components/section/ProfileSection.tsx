import React from 'react';

import { TextInput, View } from 'react-native';

import ImagePicker from '@/features/record/editResume/components/ImagePicker';
import { Gender } from '@/features/record/editResume/types/domainType';
import {
  GenderEnumToLabel,
  GenderLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

interface ProfileSectionProps {
  photo: string | null;
  name: string;
  onPhotoChange: (photoUri: string | null) => void;
  onNameChange: (name: string) => void;
  onGenderChange: (gender: Gender) => void;
  onBirthYearChange: (year: number) => void;
}

const ProfileSection = ({
  photo,
  name,
  onPhotoChange,
  onNameChange,
  onGenderChange,
  onBirthYearChange,
}: ProfileSectionProps) => {
  return (
    <View className="mt-[23px] flex-row px-5">
      <ImagePicker photo={photo} onPhotoChange={onPhotoChange} />

      <View className="ml-[25px] items-start justify-center">
        <TextInput
          className="w-[140px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
          placeholder="이름"
          value={name}
          onChangeText={onNameChange}
          placeholderTextColor={'#B7B7B7'}
        />

        <View className="mt-[10px] flex-row">
          <HUDropdown
            categoryName="성별"
            dropdownItems={Object.values(GenderEnumToLabel)}
            onSelectItem={item => {
              onGenderChange(GenderLabelToEnum[item]);
            }}
            containerStyle={{ marginRight: 8 }}
          />

          <HUDropdown
            categoryName="출생년도"
            dropdownItems={Array.from(
              { length: 2008 - 1980 + 1 },
              (_, i) => `${2008 - i}년`,
            )}
            onSelectItem={item => {
              onBirthYearChange(Number(item.replace('년', '')));
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileSection;
