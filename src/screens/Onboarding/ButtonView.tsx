import React from 'react';

import { View } from 'react-native';

import TextProvider from './TextProvider';

import HUButton from '@/shared/ui/atoms/HUButton';

type Props = {
  currentStep: number;
  onNext: () => void;
};

const ButtonView: React.FC<Props> = ({ currentStep, onNext }) => {
  return (
    <View>
      <HUButton variant="primary" onPress={onNext}>
        {TextProvider[currentStep]?.button ?? '다음'}
      </HUButton>
    </View>
  );
};

export default ButtonView;
