/**
 * @format
 */

import { initializeKakaoSDK } from '@react-native-kakao/core';
import NaverLogin from '@react-native-seoul/naver-login';
import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';

// 카카오 SDK 초기화
initializeKakaoSDK(Config.KAKAO_APP_KEY);

// 네이버 SDK 초기화
NaverLogin.initialize({
  appName: Config.NAVER_APP_NAME,
  consumerKey: Config.NAVER_CLIENT_ID,
  consumerSecret: Config.NAVER_CLIENT_SECRET,
  serviceUrlSchemeIOS: Config.NAVER_SERVICE_SCHEME_IOS,
  disableNaverAppAuthIOS: true,
});

AppRegistry.registerComponent(appName, () => App);
