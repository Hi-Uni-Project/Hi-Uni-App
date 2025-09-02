import React from 'react';

import { Text } from 'react-native';

const MailCodeErrorText = () => {
  return (
    <>
      <Text className="mt-7 text-center typo-error-14-regular">
        코드가 유효하지 않습니다. 다시 시도해주세요.
      </Text>
    </>
  );
};

export default MailCodeErrorText;
