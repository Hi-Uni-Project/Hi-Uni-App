import React from 'react';

import { Text, View } from 'react-native';

import AddButton from '@/features/record/editResume/components/AddButton';
import EducationCard from '@/features/record/editResume/components/card/EducationCard';
import { Education } from '@/features/record/editResume/types/domainType';

interface EducationSectionProps {
  educations: Education[];
  onAddPress: () => void;
  onEditPress: (id: number | string | undefined) => void;
}

const EducationSection = ({
  educations,
  onAddPress,
  onEditPress,
}: EducationSectionProps) => {
  return (
    <>
      <View className="mt-[40px] px-5">
        <View className="flex-row items-center justify-between">
          <Text className="typo-body-17-semibold">학력 사항</Text>
          <View className="flex-row items-center">
            <AddButton onPress={onAddPress} />
          </View>
        </View>
      </View>

      {educations.length > 0 &&
        educations.map((education, index) => (
          <EducationCard
            key={education.educationId ?? education.tempId ?? index}
            education={education}
            onPress={() =>
              onEditPress(education.educationId ?? education.tempId)
            }
          />
        ))}

      <View className="mx-5 mt-[34px] border-b-[1.5px] border-surface-200" />
    </>
  );
};

export default EducationSection;
