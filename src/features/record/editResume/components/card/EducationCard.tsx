import React from 'react';

import { Pressable, Text } from 'react-native';

import { Education } from '@/features/record/editResume/types/domainType';
import { formatToShortDate } from '@/features/record/editResume/utils/dateUtils';
import { GraduationStatusEnumToLabel } from '@/features/record/editResume/utils/labelMapper';

interface Props {
  education: Education;
  onPress?: () => void;
}

const EducationCard = ({ education, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mt-3 justify-start rounded-[15px] bg-surface-200 py-[15px] pl-[14px]">
      <Text className="text-main-text typo-body-16-semibold">
        {education.universityName}
      </Text>

      <Text className="mt-[5px] typo-body-15-semibold">
        {`${formatToShortDate(education.startDate)} - ${formatToShortDate(education.endDate)}`}
        <Text>({GraduationStatusEnumToLabel[education.graduationStatus]})</Text>
      </Text>

      <Text className="mt-[7px] text-gray-800 typo-caption-14-regular">
        {education.major}
      </Text>
    </Pressable>
  );
};

export default EducationCard;
