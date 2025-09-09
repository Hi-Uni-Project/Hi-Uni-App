import React from 'react';

import { Text } from 'react-native';

import { cn } from '@/shared/lib/cn';

interface Props {
  text: string;
  highlightText: string;
  selected?: boolean;
}

const HighlightedText = ({ text, highlightText, selected }: Props) => {
  // 선택된 경우: 전체 black + bold
  if (selected) {
    return (
      <Text className="text-secondary-black typo-sub-button-16-semibold">
        {text}
      </Text>
    );
  }

  // 검색어 없으면 그냥 일반 텍스트
  if (!highlightText) {
    return (
      <Text className="text-surface-700 typo-body-16-regular">{text}</Text>
    );
  }

  // 검색어 있는 경우: 일치하는 부분만 bold 처리
  const regex = new RegExp(`(${highlightText})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === highlightText.toLowerCase();
        return (
          <Text
            key={index}
            className={cn(
              isMatch
                ? 'text-surface-700 typo-sub-button-16-semibold'
                : 'text-surface-700 typo-body-16-regular',
            )}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

export default HighlightedText;
