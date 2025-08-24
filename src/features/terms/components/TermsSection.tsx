import React from 'react';

import { Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { TermsKey } from '../types/termsTypes';

import TermsTextScroll from './TermsTextScroll';

import TERMS_PROVIDER from '@/shared/constants/termsProvider';
import HUSelect from '@/shared/ui/atoms/HUSelect';

interface TermsSectionProps {
  state: any;
  toggle: (key: TermsKey) => void;
  agreeAll: () => void;
}

const TermsSection = ({ state, toggle, agreeAll }: TermsSectionProps) => {
  const termsProvider = TERMS_PROVIDER;

  return (
    <View className="mt-10">
      {termsProvider.map(item => {
        return (
          <Animated.View
            key={`${item.key}-container`}
            className="mb-4"
            layout={LinearTransition}>
            <View className="flex-row items-center">
              <HUSelect
                text={item.title}
                onPressed={
                  item.key === 'all' ? () => agreeAll() : () => toggle(item.key)
                }
                isSelected={state[item.key].isAgreed}
              />

              {state[item.key]?.type === 'required' && (
                <Text className="text-red-500 typo-body-14-semibold">
                  {' (필수)'}
                </Text>
              )}

              {state[item.key]?.type === 'optional' && (
                <Text className="typo-body-14-semibold">{' (선택)'}</Text>
              )}
            </View>

            {item.key !== 'all' &&
              item.key !== 'identity' &&
              !state[item.key].isAgreed && (
                <Animated.View
                  key={`${item.key}-description`}
                  className="mt-2 max-h-52"
                  layout={LinearTransition}
                  entering={FadeIn}
                  exiting={FadeOut}>
                  <TermsTextScroll description={item.description} />
                </Animated.View>
              )}

            {item.key === 'identity' && (
              <Animated.View
                key={`${item.key}-description`}
                className="mt-2 max-h-52"
                layout={LinearTransition}
                entering={FadeIn}
                exiting={FadeOut}>
                <TermsTextScroll description={item.description} />
              </Animated.View>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};

export default TermsSection;
