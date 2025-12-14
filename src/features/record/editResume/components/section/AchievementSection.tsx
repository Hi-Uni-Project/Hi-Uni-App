import React from 'react';

import { Text, View } from 'react-native';

import AddButton from '@/features/record/editResume/components/AddButton';
import AchievementItem from '@/features/record/editResume/components/card/AchievementItem';
import {
  Achievement,
  AchievementType,
} from '@/features/record/editResume/types/domainType';

interface AchievementSectionProps {
  achievements: Achievement[];
  onAddPress: () => void;
  onEditPress: (id: number | string | undefined) => void;
}

const AchievementSection = ({
  achievements,
  onAddPress,
  onEditPress,
}: AchievementSectionProps) => {
  const awards = achievements.filter(a => a.type === AchievementType.AWARD);
  const certificates = achievements.filter(
    a => a.type === AchievementType.CERTIFICATE,
  );
  const trainings = achievements.filter(
    a => a.type === AchievementType.TRAINING,
  );

  return (
    <>
      <View className="mt-[41px] px-5">
        <View className="flex-row items-center justify-between">
          <Text className="typo-body-17-semibold">수상/자격증/교육</Text>
          <View className="flex-row items-center">
            <AddButton onPress={onAddPress} />
          </View>
        </View>
      </View>

      <View className="mt-3 px-5">
        {/* 수상 */}
        {awards.map(a => (
          <AchievementItem
            key={a.achievementId ?? a.tempId}
            achievement={a}
            onPress={() => onEditPress(a.achievementId ?? a.tempId)}
          />
        ))}

        {/* 자격증 */}
        {certificates.map(a => (
          <AchievementItem
            key={a.achievementId ?? a.tempId}
            achievement={a}
            onPress={() => onEditPress(a.achievementId ?? a.tempId)}
          />
        ))}

        {/* 교육(연수) */}
        {trainings.map(a => (
          <AchievementItem
            key={a.achievementId ?? a.tempId}
            achievement={a}
            onPress={() => onEditPress(a.achievementId ?? a.tempId)}
          />
        ))}
      </View>
    </>
  );
};

export default AchievementSection;
