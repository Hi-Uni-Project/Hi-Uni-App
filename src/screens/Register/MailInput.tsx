import React from 'react';

import { TextInput, View } from 'react-native';

import ErrorTextArea from '@/features/register/inputMail/components/ErrorTextArea';
import { useMailSend } from '@/features/register/inputMail/hooks/useMailSend';
import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import KeyboardAvoidingLayout from '@/shared/components/layouts/KeyboardAvoidingLayout';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const MailInputScreen = () => {
  const {
    inputRef,
    inputValue,
    isFocused,
    validError,
    handleChangeEmail,
    handleSendMail,
    setIsFocused,
  } = useMailSend();

  return (
    <KeyboardAvoidingLayout>
      <ScreenLayout>
        <HeaderWithBack flow screen="3" />

        <RegisterDefaultLayout>
          <RegisterHeader
            main="웹메일로 인증번호를 발송합니다."
            sub="학교 웹메일을 입력해주세요."
          />

          <View className="items-center px-5">
            <View className="mt-12 w-full">
              <TextInput
                ref={inputRef}
                value={inputValue}
                onChangeText={text => handleChangeEmail(text)}
                className="w-full border-b-[1px] border-b-surface-300 pb-3 pl-3 text-surface-700 typo-body-16-regular"
                placeholder="학교 웹메일(ex : 20200525@knu.ac.kr)"
                placeholderTextColor="#B7B7B7"
                maxLength={40}
                autoFocus={true}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                submitBehavior="submit"
                returnKeyType="done"
              />
            </View>

            {validError && <ErrorTextArea />}
          </View>
        </RegisterDefaultLayout>
      </ScreenLayout>

      <View className={!isFocused ? 'mb-10' : ''}>
        <HUButton
          text="다음으로"
          className="self-center"
          disabled={!inputValue.length}
          onPress={handleSendMail}
        />
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default MailInputScreen;
