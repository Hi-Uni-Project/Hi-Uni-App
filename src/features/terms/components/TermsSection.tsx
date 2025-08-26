import React from 'react';

import { Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { TermsState } from '../hooks/useTerms';
import { TermsKey } from '../types/termsTypes';

import TermsTextScroll from './TermsTextScroll';

import TERMS_PROVIDER from '@/shared/constants/termsProvider';
import HUSelect from '@/shared/ui/atoms/HUSelect';

interface TermsSectionProps {
  state: TermsState;
  toggle: (key: TermsKey) => void;
  agreeAll: () => void;
}

const TermsSection = ({ state, toggle, agreeAll }: TermsSectionProps) => {
  const termsProvider = TERMS_PROVIDER;

  return (
    <View className="mt-10">
      {termsProvider.map(item => {
        const isAll = item.key === 'all';
        const showDescription =
          item.key === 'identity' || (!isAll && !state[item.key].isAgreed);

        return (
          <Animated.View
            key={`${item.key}-terms-container`}
            className="mb-4"
            layout={LinearTransition}>
            <View className="flex-row items-center">
              <HUSelect
                text={item.title}
                onPressed={isAll ? () => agreeAll() : () => toggle(item.key)}
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

            {showDescription && (
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
