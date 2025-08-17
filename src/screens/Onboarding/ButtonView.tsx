import React from 'react';

import { View } from 'react-native';

import TextProvider from './TextProvider';

import HUButton from '@/shared/ui/atoms/HUButton';

type Props = {
  currentStep: number;
  onNext: () => void;
};

const ButtonView = ({ currentStep, onNext }: Props) => {
  return (
    <View>
      <HUButton
        variant="primary"
        onPress={onNext}
        text={TextProvider[currentStep]?.button ?? '다음'}
      />
    </View>
  );
};

export default ButtonView;
