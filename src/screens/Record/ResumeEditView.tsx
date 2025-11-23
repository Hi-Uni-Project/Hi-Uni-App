import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ResumeEditHeader from '@/features/record/editResume/components/ResumeEditHeader';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View
        className="relative flex-1 bg-surface-50"
        style={{
          paddingTop: insets.top,
        }}>
        <ResumeEditHeader
          isCompleteDisabled={true}
          onCompletePress={() => {
            // Handle complete press
          }}
        />
      </View>
    </>
  );
};

export default ResumeEditView;
