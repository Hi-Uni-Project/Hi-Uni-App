import { useNavigation } from '@react-navigation/native';

import { MypageStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useRegisterStore } from '@/shared/stores/register';

export const useMypageMainService = () => {
  const navigation = useNavigation<MypageStackNavigationProp>();
  const { univ } = useRegisterStore();

  const handleScrabPress = () => navigation.navigate('MyScrab');
  const handleAccountManagePress = () => navigation.navigate('AccountManage');
  const handleTermsPress = () => console.log('노션 링킹');
  const handleRulesPress = () => console.log('노션 링킹');
  const handlePrivacyPress = () => console.log('노션 링킹');

  return {
    univ,
    navigation,
    handleScrabPress,
    handleAccountManagePress,
    handleTermsPress,
    handleRulesPress,
    handlePrivacyPress,
  };
};
