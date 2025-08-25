import React from 'react';

import { Text } from 'react-native';

const getBoldText = (text: string, key: number) => {
  return (
    <Text key={`line-${key}`} className="typo-body-14-semibold">
      {text.replaceAll('*', '')}
    </Text>
  );
};

const getIndentStyle = (text: string, key: number) => {
  return (
    <Text key={`line-${key}`} className="ml-4 typo-body-13-light">
      {text}
    </Text>
  );
};

const getDotStyle = (text: string, key: number) => {
  const content = text.replace(/^- /, '• ');
  return getIndentStyle(content, key);
};

const getParsedNode = (
  text: string,
  isFirstBold: { value: boolean },
  key: number,
): React.ReactNode | null => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const dotRegex = /^-/;
  const listRegex = /^\d\./;

  if (boldRegex.test(text)) {
    if (isFirstBold.value) {
      isFirstBold.value = false;
      return getBoldText(text, key);
    } else {
      return getBoldText('\n' + text, key);
    }
  } else if (dotRegex.test(text)) {
    return getDotStyle(text, key);
  } else if (listRegex.test(text)) {
    return getIndentStyle(text, key);
  } else {
    return (
      <Text key={`line-${key}`} className="typo-body-13-light">
        {text}
      </Text>
    );
  }
};

const getParsedComponents = (description: string): React.ReactNode[] => {
  const lines = description.split('\n');
  const isFirstBold = { value: true };

  return lines.map((line, idx) => {
    line = line.trim();
    if (line.length === 0) {
      return null;
    }
    return getParsedNode(line, isFirstBold, idx);
  });
};

export default getParsedComponents;
