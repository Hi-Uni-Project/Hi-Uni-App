import React from 'react';

import MailCodeErrorText from '@/features/register/mailCode/components/MailCodeErrorText';
import MailCodeField from '@/features/register/mailCode/components/MailCodeField';
import useMailCode from '@/features/register/mailCode/hooks/useMailCode';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import { CELL_COUNT } from '@/features/register/shared/constants/codeCell';
import KeyboardAvoidingLayout from '@/shared/components/layouts/KeyboardAvoidingLayout';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const MailCodeInput = () => {
  const { codeFieldRef, value, setValue, props, getCellOnLayoutHandler } =
    useMailCode();

  return (
    <KeyboardAvoidingLayout>
      <ScreenLayout>
        <RegisterHeader
          variant="code"
          main="인증번호를 입력해주세요."
          sub={`20200525@knu.ac.kr로
인증번호를 발송하였습니다.`}
        />

        <MailCodeField
          codeFieldRef={codeFieldRef}
          value={value}
          onChangeText={setValue}
          props={props}
          getCellOnLayoutHandler={getCellOnLayoutHandler}
        />

        <MailCodeErrorText />
      </ScreenLayout>

      <HUButton
        text="다음으로"
        className="self-center"
        disabled={value.length !== CELL_COUNT}
      />
    </KeyboardAvoidingLayout>
  );
};

export default MailCodeInput;
