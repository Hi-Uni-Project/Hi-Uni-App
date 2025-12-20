import React from 'react';

import { Pressable, Text } from 'react-native';

import { Education } from '@/features/record/editResume/types/domainType';
import { formatToShortDate } from '@/features/record/editResume/utils/dateUtils';
import { GraduationStatusEnumToLabel } from '@/features/record/editResume/utils/labelMapper';
import { truncateText } from '@/shared/utils/text/truncateText';

interface Props {
  education: Education;
  onPress?: () => void;
}

const EducationCard = ({ education, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mt-3 justify-start rounded-[15px] bg-surface-200 py-[15px] pl-[14px]">
      <Text
        className="text-main-text typo-body-16-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {truncateText(education.universityName, 25)}
      </Text>

      <Text
        className="mt-[5px] typo-body-15-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {`${formatToShortDate(education.startDate)} - ${formatToShortDate(education.endDate)}`}
        <Text>({GraduationStatusEnumToLabel[education.graduationStatus]})</Text>
      </Text>

      <Text
        className="mt-[7px] text-gray-800 typo-caption-14-regular"
        numberOfLines={1}
        ellipsizeMode="tail">
        {truncateText(education.major, 25)}
      </Text>
    </Pressable>
  );
};

export default EducationCard;
