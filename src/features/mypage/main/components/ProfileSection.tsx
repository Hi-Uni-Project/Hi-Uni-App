import React from 'react';

import clsx from 'clsx';
import { View, Text } from 'react-native';

import ProfileIcon from '@/static/icons/mypage-profile.svg';

interface Props {
  univName: string;
  firstMajorName: string;
  secondMajorName?: string;
}

const ProfileSection = ({
  univName,
  firstMajorName,
  secondMajorName,
}: Props) => (
  <View className="items-center border-gray-100 px-5 py-6">
    <ProfileIcon className="mt-1" />
    <View className="mb-3 mt-3 items-center">
      <Text className="text-main-text typo-sub-title-18-medium">
        {univName}
      </Text>
    </View>

    <View className="flex-col items-center gap-3">
      <View
        className={clsx(
          secondMajorName ? 'px-4 py-1.5' : 'px-4 py-2.5',
          'rounded-[20px] bg-surface-200',
        )}>
        <Text className="text-surface-500 typo-body-16-regular">
          {firstMajorName}
        </Text>
      </View>

      {secondMajorName && (
        <View className="rounded-[20px] bg-surface-200 px-4 py-1.5">
          <Text className="text-surface-500 typo-body-16-regular">
            {secondMajorName}
          </Text>
        </View>
      )}
    </View>
  </View>
);

export default ProfileSection;
