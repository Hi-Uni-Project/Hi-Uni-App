import { useNavigation } from '@react-navigation/native';

import { EXTERNAL_URLS } from '../../constants/externalURL';
import { createExternalLinkHandler } from '../../hooks/openURL';

import { MypageStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useRegisterStore } from '@/shared/stores/register';

export const useMypageMainService = () => {
  const navigation = useNavigation<MypageStackNavigationProp>();
  const { univ } = useRegisterStore();

  const handleScrabPress = () => navigation.navigate('MyScrab');
  const handleAccountManagePress = () => navigation.navigate('AccountManage');

  const handleTermsPress = createExternalLinkHandler(EXTERNAL_URLS.TERMS);
  const handleRulesPress = createExternalLinkHandler(EXTERNAL_URLS.RULES);
  const handlePrivacyPress = createExternalLinkHandler(EXTERNAL_URLS.PRIVACY);

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
