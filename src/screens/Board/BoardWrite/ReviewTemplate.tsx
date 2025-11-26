import React from 'react';

import { View, Text, TextInput, Pressable } from 'react-native';

import CalendarIcon from '@/static/icons/calendar.svg';

const ReviewTemplate = () => {
  return (
    <View className="w-full">
      <View className="mt-4 px-7">
        <View className="absolute left-0 top-0 h-[800px] w-[5px] rounded-[15px] bg-primary-purple" />
        {/* 회사명 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            회사명이 어떻게 되나요?
            <Text className="text-primary-purple">*</Text>
          </Text>

          <View className="mt-2 w-[150px] rounded-[15px] border border-surface-200 bg-white px-3.5 py-3">
            <TextInput
              placeholder="(ex : CJ제일제당)"
              placeholderTextColor="#B7B7B7"
              className="h-4 p-0 text-main-text typo-body-15-regular"
              multiline={false}
            />
          </View>
        </View>

        {/* 인턴 기간 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            인턴 기간이 얼마나 되나요?
            <Text className="text-primary-purple">*</Text>
          </Text>

          <View className="mt-2 flex-row space-x-3">
            {/* 시작일 */}
            <Pressable className="flex-1 flex-row items-center justify-between rounded-[12px] border border-surface-200 bg-white px-4 py-3">
              <Text className="text-main-text typo-body-15-regular">
                25.08.07
              </Text>
              <CalendarIcon width={20} height={20} color="#B7B7B7" />
            </Pressable>

            {/* 종료일 */}
            <Pressable className="flex-1 flex-row items-center justify-between rounded-[12px] border border-surface-200 bg-white px-4 py-3">
              <Text className="text-main-text typo-body-15-regular">
                25.08.07
              </Text>
              <CalendarIcon width={20} height={20} color="#B7B7B7" />
            </Pressable>
          </View>
        </View>

        {/* 직무 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            어떤 직무에서 근무했나요?
            <Text className="text-primary-purple">*</Text>
          </Text>

          <View className="mt-2 w-[275px] rounded-[15px] border border-surface-200 bg-white p-4">
            <TextInput
              placeholder="(ex : 글로벌마케팅팀/콘텐츠 기획 및 번역)"
              placeholderTextColor="#B7B7B7"
              className="h-4 p-0 text-main-text typo-body-15-regular"
              multiline={false}
            />
          </View>
        </View>

        {/* 담당했던 업무 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            담당했던 업무가 무엇인가요?
            <Text className="text-primary-purple">*</Text>
          </Text>

          <View className="mt-2 rounded-[15px] border border-surface-200 bg-white p-4">
            <TextInput
              multiline
              placeholder="(ex : 해외 홍보 콘텐츠 번역 및 검수, SNS 콘텐츠 기획 아이디어 제안, 공공기관의 해외 파트너십 관련 자료 리서치 등)"
              placeholderTextColor="#B7B7B7"
              className="h-16 p-0 text-main-text typo-body-15-regular"
            />
          </View>
        </View>

        {/* 실무에서 배운 점 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            실무에서 어떤 것을 주로 배웠나요?
            <Text className="text-primary-purple">*</Text>
          </Text>

          <View className="mt-2 rounded-[15px] border border-surface-200 bg-white p-4">
            <TextInput
              multiline
              placeholder="(ex : 공공기관은 민간기업과 달리 의사결정 절차가 매우 체계적이라는 걸 느꼈고, 다국어 콘텐츠에 맞춰 커뮤니케이션 전략을 고민해야 하는 부분이 특히나 인상 깊었습니다.)"
              placeholderTextColor="#B7B7B7"
              className="h-20 p-0 text-main-text typo-body-15-regular"
            />
          </View>
        </View>

        {/* 느낀 점 */}
        <View className="mb-6">
          <Text className="text-main-text typo-body-16-semibold">
            느낀 점을 자유롭게 작성해주세요.
          </Text>

          <View className="mt-2 rounded-[15px] border border-surface-200 bg-white p-4">
            <TextInput
              multiline
              placeholder="(ex : 이전에는 콘텐츠 기획을 막연하게 생각했는데, 이번 경험을 통해 기획과 실행 사이의 구체적인 프로세스를 알게 되었고, 공공기관에서 일하는 것도 제 진로 옵션 중 하나로 고려하게 됐습니다.)"
              placeholderTextColor="#B7B7B7"
              className="h-[100px] p-0 text-main-text typo-body-15-regular"
            />
          </View>
        </View>
      </View>
      {/* 추가 */}
      <View className="w-full">
        <TextInput
          multiline
          placeholder="추가로 인턴십 경험을 작성해주세요."
          placeholderTextColor="#b7b7b7"
          className="h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 text-main-text typo-body-15-regular"
        />
      </View>
    </View>
  );
};

export default ReviewTemplate;
