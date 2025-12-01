import React from 'react';

import { View, TextInput } from 'react-native';

import { isJobFormData, TemplateProps } from '../../types';
import { FormField } from '../FormField';

const JobTemplate = ({ reviewForm }: TemplateProps) => {
  const { formData, updateField } = reviewForm;

  if (!isJobFormData(formData)) {
    return null;
  }

  return (
    <View className="w-full">
      <View className="mt-4 px-7">
        <View className="absolute left-0 top-0 h-[820px] w-[5px] rounded-[15px] bg-primary-purple" />

        {/* 회사명 */}
        <FormField
          label="회사명이 어떻게 되나요?"
          placeholder="(ex : 현대자동차)"
          value={formData.companyName}
          onChangeText={text => updateField('companyName', text)}
          required
        />

        {/* 직무 */}
        <FormField
          label="어떤 직무로 입사하셨나요?"
          placeholder="(ex : 연구개발직/차량 소프트웨어 엔지니어)"
          value={formData.position}
          onChangeText={text => updateField('position', text)}
          required
        />

        {/* 지원방법 */}
        <FormField
          label="어떤 방법으로 지원했나요?"
          placeholder="(ex : 채용 공고를 통해 온라인 지원)"
          value={formData.applicationMethod}
          onChangeText={text => updateField('applicationMethod', text)}
          required
        />

        {/* 준비과정 */}
        <FormField
          label={'취업 준비 과정에서 가장 집중했던\n부분은 무엇인가요?'}
          placeholder="(ex : 포트폴리오, 자격증, 자기소개서 등)"
          value={formData.focusArea}
          onChangeText={text => updateField('focusArea', text)}
          required
        />

        {/* 준비 과정(구체적) */}
        <FormField
          label="면접이나 전형을 위해 어떻게 준비했나요?"
          placeholder="(ex : 자동차 산업 관련 최신 리포트 조사, 코딩 테스트 문제 풀이, 직무와 관련된 개인 프로젝트 정리 등을 준비했습니다.)"
          value={formData.preparation}
          onChangeText={text => updateField('preparation', text)}
          multiline
          height="h-18"
          required
        />

        {/* 결과 */}
        <FormField
          label="최종 결과는 어떻게 되었나요?"
          placeholder="(ex : 최종 합격)"
          value={formData.result}
          onChangeText={text => updateField('result', text)}
          required
        />

        {/* 느낀 점 */}
        <FormField
          label="느낀 점을 자유롭게 작성해주세요."
          placeholder="(ex : 채용 과정에서 기술적 역량뿐만 아니라 협업 능력과 문제 해결 능력을 중요하게 본다는 걸 깨달았고, 앞으로도 꾸준히 학습과 경험을 쌓아야겠다고 느꼈습니다.)"
          value={formData.feelings}
          onChangeText={text => updateField('feelings', text)}
          multiline
          height="h-[80px]"
        />
      </View>

      {/* 추가 */}
      <View className="mt-4 w-full">
        <TextInput
          multiline
          placeholder="추가로 취업 후기를 작성해주세요."
          placeholderTextColor="#b7b7b7"
          value={formData.additionalExperience}
          onChangeText={text => updateField('additionalExperience', text)}
          className="h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 text-main-text typo-body-15-regular"
        />
      </View>
    </View>
  );
};

export default JobTemplate;
