import React from 'react';

import { Pressable, Text } from 'react-native';

import { Project } from '@/features/record/editResume/types/domainType';
import { formatToShortDate } from '@/features/record/editResume/utils/dateUtils';
import { truncateText } from '@/shared/utils/text/truncateText';

interface Props {
  project: Project;
  onPress?: () => void;
}

const ProjectCard = ({ project, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mt-3 justify-start rounded-[15px] bg-surface-200 p-[14px]">
      <Text className="text-primary-purple typo-caption-14-regular">
        프로젝트
      </Text>

      <Text
        className="mt-1 text-main-text typo-body-16-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {truncateText(project.projectName, 25)}
      </Text>

      <Text
        className="mt-[5px] typo-body-15-semibold"
        numberOfLines={1}
        ellipsizeMode="tail">
        {`${formatToShortDate(project.startDate)} - ${formatToShortDate(project.endDate)}`}
      </Text>

      {project.role && project.role.trim() !== '' && (
        <Text
          className="mt-[7px] text-gray-800 typo-caption-14-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {truncateText(project.role, 25)}
        </Text>
      )}

      {project.experienceDescription &&
        project.experienceDescription.trim() !== '' && (
          <Text
            className="mt-[3px] text-gray-800 typo-caption-14-regular"
            numberOfLines={1}
            ellipsizeMode="tail">
            {truncateText(project.experienceDescription, 25)}
          </Text>
        )}
    </Pressable>
  );
};

export default ProjectCard;
