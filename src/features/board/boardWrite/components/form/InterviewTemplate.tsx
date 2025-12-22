import React from 'react';

import { View, TextInput, Platform } from 'react-native';

import { isInterviewFormData, TemplateProps } from '../../types';
import { FormField } from '../FormField';

const InterviewTemplate = ({ reviewForm }: TemplateProps) => {
  const { formData, updateField } = reviewForm;

  if (!isInterviewFormData(formData)) {
    return null;
  }

  return (
    <View className="w-full">
      <View className="mt-4 px-7">
        <View className="absolute left-0 top-0 h-[880px] w-[5px] rounded-[15px] bg-primary-purple" />

        {/* 회사명 */}
        <FormField
          label="회사명이 어떻게 되나요?"
          placeholder="(ex : 삼성전자)"
          value={formData.companyName}
          onChangeText={text => updateField('companyName', text)}
          required
        />

        {/* 직무 */}
        <FormField
          label="어떤 직무에 지원했나요?"
          placeholder="(ex : 해외영업/글로벌 세일즈)"
          value={formData.position}
          onChangeText={text => updateField('position', text)}
          required
        />

        {/* 면접 방식 */}
        <FormField
          label="면접은 어떤 방식으로 진행되었나요?"
          placeholder="(ex : 패널 면접)"
          value={formData.interviewType}
          onChangeText={text => updateField('interviewType', text)}
          required
        />

        {/* 받은 질문 */}
        <FormField
          label="면접에서 어떤 질문을 받았나요?"
          placeholder="(ex : 글로벌 시장에서 한국 제품의 강점, 외국어 활용 경험, 갑작스러운 클라이언트 요청을 어떻게 대응할지 등)"
          value={formData.questions}
          onChangeText={text => updateField('questions', text)}
          multiline
          height={65}
          required
        />

        {/* 답변 준비 */}
        <FormField
          label="답변은 어떻게 준비하셨나요?"
          placeholder="(ex : 무역 관련 시사 자료를 공부하고, 이전 교환학생 경험과 인턴십 사례를 활용해 답변을 구성하였습니다.)"
          value={formData.answerPreparation}
          onChangeText={text => updateField('answerPreparation', text)}
          height={65}
          multiline
          required
        />

        {/* 분위기 */}
        <FormField
          label="면접 분위기는 어땠나요?"
          placeholder="(ex : 비교적 편안했으며, 꼬리 질문보다는 경험 기반 답변을 중점적으로 확인하는 분위기였습니다.)"
          value={formData.atmosphere}
          onChangeText={text => updateField('atmosphere', text)}
          height={65}
          multiline
          required
        />

        {/* 느낀 점 */}
        <FormField
          label="느낀 점을 자유롭게 작성해주세요."
          placeholder="(ex : 지식보다는 경험을 구체적으로 풀어내는 게 훨씬 효과적이라는 점을 알게 되었고, 앞으로 경험 정리에 더 신경써야겠다고 생각했습니다.)"
          value={formData.feelings}
          onChangeText={text => updateField('feelings', text)}
          multiline
          required
          height={Platform.OS === 'android' ? 90 : 65}
        />
      </View>

      {/* 추가 */}
      <View className="mt-4 w-full">
        <TextInput
          multiline
          placeholder="추가로 면접 후기를 작성해주세요."
          placeholderTextColor="#b7b7b7"
          value={formData.additionalExperience}
          textAlignVertical="top"
          onChangeText={text => updateField('additionalExperience', text)}
          className="h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 text-main-text typo-body-15-regular"
        />
      </View>
    </View>
  );
};

export default InterviewTemplate;
