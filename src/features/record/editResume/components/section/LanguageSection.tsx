import React from 'react';

import { Text, View } from 'react-native';

import AddButton from '@/features/record/editResume/components/AddButton';
import LanguageCard from '@/features/record/editResume/components/card/LanguageCard';
import { Language } from '@/features/record/editResume/types/domainType';

interface LanguageSectionProps {
  languages: Language[];
  onAddPress: () => void;
  onEditPress: (id: number | string | undefined) => void;
}

const LanguageSection = ({
  languages,
  onAddPress,
  onEditPress,
}: LanguageSectionProps) => {
  return (
    <>
      <View className="mt-[41px] px-5">
        <View className="flex-row items-center justify-between">
          <Text className="typo-body-17-semibold">어학</Text>
          <View className="flex-row items-center">
            <AddButton onPress={onAddPress} />
          </View>
        </View>
      </View>

      {languages.length > 0 && (
        <View className="mt-3 flex-row flex-wrap px-5">
          {languages.map((lang, idx) => (
            <LanguageCard
              key={lang.languageId ?? lang.tempId ?? idx}
              language={lang}
              onPress={() => onEditPress(lang.languageId ?? lang.tempId)}
              isLeft={idx % 2 === 0}
            />
          ))}
        </View>
      )}
    </>
  );
};

export default LanguageSection;
