import React from 'react';

import { View, TextInput, Text } from 'react-native';

import { WorkStoryFormData } from '../../types';
import { DateSelector } from '../DateSelector';
import { FormField } from '../FormField';
import TemplateCalendar from '../TemplateCalendar';

import { formatDateOrTime } from '@/shared/utils/formatter';
import DateLine from '@/static/icons/date-line.svg';

interface Props {
  reviewForm: ReturnType<
    typeof import('../../hooks/useReviewTemplate').useReviewTemplate
  >;
}

const ExperienceTemplate = ({ reviewForm }: Props) => {
  const {
    formData: rawFormData,
    updateField,
    startDate,
    endDate,
    showCal,
    toggleCalendar,
    formatDate,
  } = reviewForm;
  const formData = rawFormData as WorkStoryFormData;

  return (
    <View className="w-full">
      <View className="mt-4 px-7">
        <View className="absolute left-0 top-0 h-[865px] w-[5px] rounded-[15px] bg-primary-purple" />

        {/* 회사명 */}
        <FormField
          label="회사명이 어떻게 되나요?"
          placeholder="(ex : 네이버)"
          value={formData.companyName}
          onChangeText={text => updateField('companyName', text)}
          required
        />

        {/* 인턴 기간 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            근무 기간이 얼마나 되나요?
            <Text className="text-primary-purple"> *</Text>
          </Text>

          <View className="mt-2 flex-row space-x-3">
            <DateSelector
              label="시작일"
              date={formatDateOrTime(startDate)}
              onPress={toggleCalendar}
            />

            <DateLine className="mr-3 mt-6 self-center" />

            <DateSelector
              label="종료일"
              date={formatDate(endDate)}
              onPress={toggleCalendar}
            />
          </View>

          <View className="absolute top-28 z-10">
            {showCal && <TemplateCalendar />}
          </View>
        </View>

        {/* 직무 */}
        <FormField
          label="어떤 직무에서 근무했나요?"
          placeholder="(ex : UX 디자이너)"
          value={formData.position}
          onChangeText={text => updateField('position', text)}
          required
        />

        {/* 직급 */}
        <FormField
          label="어떤 직급/직책이었나요?"
          placeholder="(ex : 사원, 대리, 팀장 등)"
          value={formData.jobLevel}
          onChangeText={text => updateField('jobLevel', text)}
          required
        />

        {/* 담당 업무 */}
        <FormField
          label="담당했던 업무가 무엇인가요?"
          placeholder="(ex : 모바일 앱 화면 기획, 사용자 여정 분석, A/B 테스트 결과 정리 등)"
          value={formData.tasks}
          onChangeText={text => updateField('tasks', text)}
          multiline
          height="h-18"
          required
        />

        {/* 직무 역량 */}
        <FormField
          label={'해당 직무에 필요한 역량이나 스킬은\n무엇인가요?'}
          placeholder="(ex : Figma와 같은 디자인 툴 활용 능력, 데이터 기반 사고, 사용자 관점에서 문제 해결 능력 등)"
          value={formData.requiredSkills}
          onChangeText={text => updateField('requiredSkills', text)}
          height="h-18"
          multiline
          required
        />

        {/* 느낀 점 */}
        <FormField
          label="느낀 점을 자유롭게 작성해주세요."
          placeholder="(ex : 단순히 예쁜 화면을 만드는 것이 아니라, 사용자 경험을 수치로 증명하는 것이 디자이너의 중요한 역할이라는 것을 배웠습니다.)"
          value={formData.feelings}
          onChangeText={text => updateField('feelings', text)}
          multiline
          height="h-[70px]"
        />
      </View>

      {/* 추가 */}
      <View className="mt-4 w-full">
        <TextInput
          multiline
          placeholder="추가로 실무 이야기를 작성해주세요."
          placeholderTextColor="#b7b7b7"
          value={formData.additionalExperience}
          onChangeText={text => updateField('additionalExperience', text)}
          className="h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 text-main-text typo-body-15-regular"
        />
      </View>
    </View>
  );
};

export default ExperienceTemplate;
