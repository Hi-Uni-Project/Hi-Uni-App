import React from 'react';

import MailCodeErrorText from '@/features/register/mailCode/components/MailCodeErrorText';
import MailCodeField from '@/features/register/mailCode/components/MailCodeField';
import useMailCode from '@/features/register/mailCode/hooks/useMailCode';
import { useMailCodeVerify } from '@/features/register/mailCode/hooks/useMailCodeVerify';
import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import { CELL_COUNT } from '@/features/register/shared/constants/codeCell';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import KeyboardAvoidingLayout from '@/shared/components/layouts/KeyboardAvoidingLayout';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useRegisterStore } from '@/shared/stores/register';
import HUButton from '@/shared/ui/atoms/HUButton';

const MailCodeInputScreen = () => {
  const { codeFieldRef, value, setValue, props, getCellOnLayoutHandler } =
    useMailCode();
  const { codeError, handleChangeCode, handleSendCode } = useMailCodeVerify();
  const { univ } = useRegisterStore();

  return (
    <KeyboardAvoidingLayout>
      <ScreenLayout>
        <HeaderWithBack flow screen="3" />

        <RegisterDefaultLayout>
          <RegisterHeader
            variant="code"
            main="인증번호를 입력해주세요."
            sub={`${univ.univEmail}로\n인증번호를 발송하였습니다.`}
          />

          <MailCodeField
            codeFieldRef={codeFieldRef}
            value={value}
            onChangeText={text => handleChangeCode(text, setValue)}
            props={props}
            getCellOnLayoutHandler={getCellOnLayoutHandler}
          />

          {codeError && <MailCodeErrorText />}
        </RegisterDefaultLayout>
      </ScreenLayout>

      <HUButton
        text="다음으로"
        className="self-center"
        onPress={() => handleSendCode(value, setValue)}
        disabled={value.length !== CELL_COUNT}
      />
    </KeyboardAvoidingLayout>
  );
};

export default MailCodeInputScreen;
