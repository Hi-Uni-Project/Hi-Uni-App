import React from 'react';

import { Text, View } from 'react-native';

import AddButton from '@/features/record/editResume/components/AddButton';
import CareerCard from '@/features/record/editResume/components/card/CareerCard';
import { Career } from '@/features/record/editResume/types/domainType';

interface CareerSectionProps {
  careers: Career[];
  onAddPress: () => void;
  onEditPress: (id: number | string | undefined) => void;
}

const CareerSection = ({
  careers,
  onAddPress,
  onEditPress,
}: CareerSectionProps) => {
  return (
    <>
      <View className="mt-[40px] px-5">
        <View className="flex-row items-center justify-between">
          <Text className="typo-body-17-semibold">
            경력 사항 혹은 프로젝트 사항
          </Text>
          <View className="flex-row items-center">
            <AddButton onPress={onAddPress} />
          </View>
        </View>
      </View>

      {careers.length > 0 &&
        careers.map((career, index) => (
          <CareerCard
            key={career.careerId ?? career.tempId ?? index}
            career={career}
            onPress={() => onEditPress(career.careerId ?? career.tempId)}
          />
        ))}
    </>
  );
};

export default CareerSection;
