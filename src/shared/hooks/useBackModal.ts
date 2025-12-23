import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

const useBackModal = (isDirty: boolean) => {
  const navigation = useNavigation();
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);

  const handleBackPress = () => {
    if (isDirty) {
      setIsBackModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  const handleConfirmBack = () => {
    setIsBackModalVisible(false);
    navigation.goBack();
  };

  const handleCloseModal = () => setIsBackModalVisible(false);

  return {
    isBackModalVisible,
    handleBackPress,
    handleConfirmBack,
    handleCloseModal,
  };
};

export { useBackModal };
