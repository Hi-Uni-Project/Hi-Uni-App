import React from 'react';

import { StyleSheet, Text } from 'react-native';

const TextStyleSheet = StyleSheet.create({
  bold: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: -0.64,
  },
  normal: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '300',
    letterSpacing: -0.64,
  },
});

const getBoldText = (
  text: string,
  key: number,
  isFirstBold: { value: boolean },
) => {
  let parsedText = text;

  if (!isFirstBold.value) {
    parsedText = '\n' + parsedText;
  } else {
    isFirstBold.value = false;
  }

  return (
    <Text key={`line-${key}`} style={TextStyleSheet.bold}>
      {parsedText.replaceAll('*', '')}
    </Text>
  );
};

const getIndentStyle = (text: string, key: number) => {
  return (
    <Text key={`line-${key}`} style={TextStyleSheet.normal}>
      {text}
    </Text>
  );
};

const getDotStyle = (text: string, key: number) => {
  const content = text.replace(/^- /, '• ');
  return getIndentStyle(content, key);
};

const getNormalStyle = (text: string, key: number) => {
  return (
    <Text key={`line-${key}`} style={TextStyleSheet.normal}>
      {text}
    </Text>
  );
};

const getParsedNode = (
  text: string,
  isFirstBold: { value: boolean },
  key: number,
): React.ReactNode | null => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const dotRegex = /^-/;
  const listRegex = /^\d\./;

  const rules = [
    {
      regex: boldRegex,
      getStyle: () => getBoldText(text, key, isFirstBold),
    },
    {
      regex: dotRegex,
      getStyle: () => getDotStyle(text, key),
    },
    {
      regex: listRegex,
      getStyle: () => getIndentStyle(text, key),
    },
  ];

  const textType = rules.find(rule => rule.regex.test(text));
  return textType ? textType.getStyle() : getNormalStyle(text, key);
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
