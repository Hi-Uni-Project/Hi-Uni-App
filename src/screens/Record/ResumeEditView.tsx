import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ImagePicker from '@/features/record/editResume/components/ImagePicker';
import ResumeEditHeader from '@/features/record/editResume/components/ResumeEditHeader';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();

  const sexRef = React.useRef<View>(null);
  const ageRef = React.useRef<View>(null);

  return (
    <>
      <View
        className="relative flex-1 bg-surface-50"
        style={{
          paddingTop: insets.top + 74,
        }}>
        <ResumeEditHeader
          isCompleteDisabled={true}
          onCompletePress={() => {
            // Handle complete press
          }}
        />
        <ImagePicker />

        <View className="flex-row">
          <HUDropdown
            ref={sexRef}
            categoryName="성별"
            dropdownItems={['남성', '여성', '선택안함']}
            onSelectItem={item => {
              console.log(item);
            }}
          />
          <HUDropdown
            ref={ageRef}
            categoryName="나이"
            dropdownItems={['10대', '20대', '30대', '40대', '50대 이상']}
            onSelectItem={item => {
              console.log(item);
            }}
          />
        </View>

        {/* <HUCategoryDropdown
          categoryName="성별"
          dropdownItems={['s', 'a', 'g']}
          onSelectItem={item => {
            console.log(item);
          }}
        /> */}
      </View>
    </>
  );
};

export default ResumeEditView;
