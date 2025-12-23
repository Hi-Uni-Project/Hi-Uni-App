import React from 'react';

import { Pressable, Text } from 'react-native';

import { Achievement } from '@/features/record/editResume/types/domainType';
import { formatToShortDate } from '@/features/record/editResume/utils/dateUtils';
import { AchievementTypeEnumToLabel } from '@/features/record/editResume/utils/labelMapper';
import { truncateText } from '@/shared/utils/text/truncateText';

interface Props {
  achievement: Achievement;
  onPress?: () => void;
}

const AchievementItem = ({ achievement, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 justify-start rounded-[15px] bg-surface-200 p-[14px]">
      <Text className="text-primary-purple typo-caption-14-regular">
        {AchievementTypeEnumToLabel[achievement.type]}
      </Text>

      <Text
        className="mt-1 text-main-text typo-body-16-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {truncateText(achievement.activityName, 25)}
      </Text>

      <Text
        className="mt-[5px] text-main-text typo-body-15-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {formatToShortDate(achievement.periodDate)}
      </Text>

      {achievement.achievementDescription && (
        <Text
          className="mt-[7px] text-surface-800 typo-caption-14-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {truncateText(achievement.achievementDescription, 25)}
        </Text>
      )}
    </Pressable>
  );
};

export default AchievementItem;
