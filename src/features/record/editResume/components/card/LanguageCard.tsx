import React from 'react';

import { Pressable, Text } from 'react-native';

import { Language } from '@/features/record/editResume/types/domainType';
import { LanguageLevelEnumToLabel } from '@/features/record/editResume/utils/labelMapper';
import { cn } from '@/shared/lib/cn';
import { truncateText } from '@/shared/utils/text/truncateText';

interface Props {
  language: Language;
  onPress?: () => void;
  isLeft?: boolean;
}

const LanguageCard = ({ language, onPress, isLeft }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'mb-3 h-[103px] w-[48%] justify-start rounded-[15px] bg-surface-200 py-[15px] pl-[14px]',
        isLeft ? 'mr-[4%]' : '',
      )}>
      <Text
        className="text-main-text typo-body-16-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {truncateText(language.language, 25)}
      </Text>
      <Text
        className="mt-[7px] text-surface-800 typo-caption-14-regular"
        numberOfLines={1}
        ellipsizeMode="tail">
        {LanguageLevelEnumToLabel[language.level]}
      </Text>
    </Pressable>
  );
};

export default LanguageCard;
