import React from 'react';

import { Text, View } from 'react-native';

import AddButton from '@/features/record/editResume/components/AddButton';
import CareerCard from '@/features/record/editResume/components/card/CareerCard';
import ProjectCard from '@/features/record/editResume/components/card/ProjectCard';
import { Career, Project } from '@/features/record/editResume/types/domainType';

interface CareerSectionProps {
  careers: Career[];
  projects: Project[];
  onAddPress: () => void;
  onEditCareerPress: (id: number | string | undefined) => void;
  onEditProjectPress: (id: number | string | undefined) => void;
}

const CareerSection = ({
  careers,
  projects,
  onAddPress,
  onEditCareerPress,
  onEditProjectPress,
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
            onPress={() => onEditCareerPress(career.careerId ?? career.tempId)}
          />
        ))}

      {projects.length > 0 &&
        projects.map((project, index) => (
          <ProjectCard
            key={project.projectId ?? project.tempId ?? index}
            project={project}
            onPress={() =>
              onEditProjectPress(project.projectId ?? project.tempId)
            }
          />
        ))}
    </>
  );
};

export default CareerSection;
