import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ImagePicker from '@/features/record/editResume/components/ImagePicker';
import ResumeEditHeader from '@/features/record/editResume/components/ResumeEditHeader';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();
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
      </View>
    </>
  );
};

export default ResumeEditView;
