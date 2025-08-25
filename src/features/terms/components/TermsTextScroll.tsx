import React from 'react';

import { ScrollView, ScrollViewProps, View } from 'react-native';

import getParsedComponents from '../utils/termsParser';

interface TermsTextScrollProps extends ScrollViewProps {
  description: string;
}

const getDescriptionView = (description: string): React.ReactNode => {
  const parsedTextComponents = getParsedComponents(description);

  return (
    <View key="description-container" className="p-3">
      {parsedTextComponents}
    </View>
  );
};

const TermsTextScroll = ({ description }: TermsTextScrollProps) => {
  return (
    <ScrollView nestedScrollEnabled className="rounded-xl bg-[#EAEAEA99]">
      {getDescriptionView(description)}
    </ScrollView>
  );
};

export default TermsTextScroll;
