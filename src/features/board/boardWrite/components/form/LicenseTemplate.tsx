import React from 'react';

import { View, TextInput } from 'react-native';

import { isLicenseFormData, TemplateProps } from '../../types';
import { FormField } from '../FormField';

const LicenseTemplate = ({ reviewForm }: TemplateProps) => {
  const { formData, updateField } = reviewForm;

  if (!isLicenseFormData(formData)) {
    return null;
  }

  return (
    <View className="w-full">
      <View className="mt-4 px-7">
        <View className="absolute left-0 top-0 h-[865px] w-[5px] rounded-[15px] bg-primary-purple" />

        {/* 자격증 */}
        <FormField
          label="어떤 자격증인가요?"
          placeholder="(ex : 정보처리기사)"
          value={formData.licenseName}
          onChangeText={text => updateField('licenseName', text)}
          required
        />

        {/* 준비 기간 */}
        <FormField
          label="준비 기간은 얼마나 걸렸나요?"
          placeholder="(ex : 6달)"
          value={formData.preparationPeriod}
          onChangeText={text => updateField('preparationPeriod', text)}
          required
        />

        {/* 교재 */}
        <FormField
          label="도움이 된 교재나 강의가 있나요?"
          placeholder="(ex : 시나공 교재, 인강 사이트 모의고사 풀이 등)"
          value={formData.materials}
          onChangeText={text => updateField('materials', text)}
          required
        />

        {/* 시험 난이도 */}
        <FormField
          label="시험 난이도는 어떻게 느껴졌나요? *"
          placeholder="(ex : 실기는 난이도가 높았고, 코딩 문제에서 시간 관리가 중요했습니다.)"
          value={formData.difficulty}
          onChangeText={text => updateField('difficulty', text)}
          multiline
          height={45}
          required
        />

        {/* 공부 방법 */}
        <FormField
          label="주로 어떤 방법으로 공부했나요?"
          placeholder="(ex : 기출 문제 반복 풀이, 코드 실습, 오답노트 작성 등으로 공부했습니다.)"
          value={formData.studyMethod}
          onChangeText={text => updateField('studyMethod', text)}
          height={45}
          multiline
          required
        />

        {/* 준비 팁 */}
        <FormField
          label={'시험 준비나 응시에 도움이 될\n나만의 팁이 있다면 알려주세요.'}
          placeholder="(ex : 실기에서는 시험 직전에 알고리즘 유형별 코드 패턴을 암기하는 것이 큰 도움이 되었습니다.)"
          value={formData.tips}
          onChangeText={text => updateField('tips', text)}
          multiline
          required
          height={65}
        />

        {/* 느낀 점 */}
        <FormField
          label="느낀 점을 자유롭게 작성해주세요."
          placeholder="(ex : 공부 과정이 쉽지 않았지만, 합격 후 실무에서 개념을 적용할 수 있었고 자신감이 크게 생겼습니다.)"
          value={formData.feelings}
          onChangeText={text => updateField('feelings', text)}
          multiline
          height={65}
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

export default LicenseTemplate;
