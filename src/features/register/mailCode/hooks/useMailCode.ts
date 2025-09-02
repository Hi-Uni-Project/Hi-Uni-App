import { useState, useEffect, useRef } from 'react';

import { useClearByFocusCell } from 'react-native-confirmation-code-field';

const useMailCode = () => {
  const codeFieldRef = useRef(null);
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (codeFieldRef.current) {
      codeFieldRef.current.focus();
    }
  }, [value]);

  return {
    codeFieldRef,
    value,
    setValue,
    props,
    getCellOnLayoutHandler,
  };
};

export default useMailCode;
