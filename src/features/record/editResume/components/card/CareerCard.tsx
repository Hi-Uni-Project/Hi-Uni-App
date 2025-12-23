import React from 'react';

import { Pressable, Text } from 'react-native';

import { Career } from '@/features/record/editResume/types/domainType';
import { formatToShortDate } from '@/features/record/editResume/utils/dateUtils';
import { truncateText } from '@/shared/utils/text/truncateText';

interface Props {
  career: Career;
  onPress?: () => void;
}

const CareerCard = ({ career, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mt-3 justify-start rounded-[15px] bg-surface-200 p-[14px]">
      <Text className="text-primary-purple typo-caption-14-regular">경력</Text>

      <Text
        className="mt-1 text-main-text typo-body-16-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {truncateText(career.companyName, 25)}
      </Text>

      <Text
        className="mt-[5px] typo-body-15-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {`${formatToShortDate(career.startDate)} - ${formatToShortDate(career.endDate)}`}
      </Text>

      {career.role && career.role.trim() !== '' && (
        <Text
          className="mt-[7px] text-gray-800 typo-caption-14-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {truncateText(career.role, 25)}
        </Text>
      )}

      {career.position && career.position.trim() !== '' && (
        <Text
          className="mt-[3px] text-gray-800 typo-caption-14-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {truncateText(career.position, 25)}
        </Text>
      )}

      {career.jobDescription && career.jobDescription.trim() !== '' && (
        <Text
          className="mt-[3px] text-gray-800 typo-caption-14-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {truncateText(career.jobDescription, 25)}
        </Text>
      )}
    </Pressable>
  );
};

export default CareerCard;
