import React from 'react';

import { View, Text, TextInput } from 'react-native';

import { isInternshipFormData, TemplateProps } from '../../types';
import { DateSelector } from '../DateSelector';
import { FormField } from '../FormField';
import TemplateCalendar from '../TemplateCalendar';

import DateLine from '@/static/icons/date-line.svg';

const InternshipTemplate = ({ reviewForm }: TemplateProps) => {
  const {
    formData,
    updateField,
    startDate,
    endDate,
    showCal,
    calendarMode,
    openCalendar,
    closeCalendar,
    handleDateSelect,
    formatDate,
  } = reviewForm;

  if (!isInternshipFormData(formData)) {
    return null;
  }

  return (
    <View className="w-full">
      <View className="mt-4 px-7">
        <View className="absolute left-0 top-0 h-[830px] w-[5px] rounded-[15px] bg-primary-purple" />

        {/* 회사명 */}
        <FormField
          label="회사명이 어떻게 되나요"
          placeholder="(ex : CJ제일제당)"
          value={formData.companyName}
          onChangeText={text => updateField('companyName', text)}
          required
        />

        {/* 인턴 기간 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            인턴 기간이 얼마나 되나요?
            <Text className="text-primary-purple"> *</Text>
          </Text>

          <View className="mt-2 flex-row space-x-3">
            <DateSelector
              label="시작일"
              date={formatDate(startDate)}
              onPress={() => openCalendar('start')}
            />

            <DateLine className="mt-6 self-center" />

            <DateSelector
              label="종료일"
              date={formatDate(endDate)}
              onPress={() => openCalendar('end')}
            />
          </View>

          {/* 캘린더 오버레이 */}
          {showCal && (
            <View className="absolute left-0 top-28 z-10">
              <TemplateCalendar
                mode={calendarMode!}
                startDate={startDate}
                endDate={endDate}
                onSelectDate={handleDateSelect}
                onClose={closeCalendar}
              />
            </View>
          )}
        </View>

        {/* 직무 */}
        <FormField
          label="어떤 직무에서 근무했나요?"
          placeholder="(ex : 글로벌마케팅팀/콘텐츠 기획 및 번역)"
          value={formData.position}
          onChangeText={text => updateField('position', text)}
          required
        />

        {/* 담당했던 업무 */}
        <FormField
          label="담당했던 업무가 무엇인가요?"
          placeholder="(ex : 해외 홍보 콘텐츠 번역 및 검수, SNS 콘텐츠 기획 아이디어 제안, 공공기관의 해외 파트너십 관련 자료 리서치 등)"
          value={formData.tasks}
          onChangeText={text => updateField('tasks', text)}
          multiline
          height={65}
          required
        />

        {/* 실무에서 배운 점 */}
        <FormField
          label="실무에서 어떤 것을 주로 배웠나요?"
          placeholder="(ex : 공공기관은 민간기업과 달리 의사결정 절차가 매우 체계적이라는 걸 느꼈고, 다국어 콘텐츠에 맞춰 커뮤니케이션 전략을 고민해야 하는 부분이 특히나 인상 깊었습니다.)"
          value={formData.learnings}
          onChangeText={text => updateField('learnings', text)}
          multiline
          height={90}
          required
        />

        {/* 느낀 점 */}
        <FormField
          label="느낀 점을 자유롭게 작성해주세요."
          placeholder="(ex : 이전에는 콘텐츠 기획을 막연하게 생각했는데, 이번 경험을 통해 기획과 실행 사이의 구체적인 프로세스를 알게 되었고, 공공기관에서 일하는 것도 제 진로 옵션 중 하나로 고려하게 됐습니다.)"
          value={formData.feelings}
          onChangeText={text => updateField('feelings', text)}
          multiline
          required
          height={115}
        />
      </View>

      {/* 추가 */}
      <View className="mt-4 w-full">
        <TextInput
          multiline
          placeholder="추가로 인턴십 경험을 작성해주세요."
          placeholderTextColor="#b7b7b7"
          value={formData.additionalExperience}
          onChangeText={text => updateField('additionalExperience', text)}
          textAlignVertical="top"
          className="h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 text-main-text typo-body-15-regular"
        />
      </View>
    </View>
  );
};

export default InternshipTemplate;
