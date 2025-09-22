/**
 * @format
 */

import { initializeKakaoSDK } from '@react-native-kakao/core';
import { AppRegistry } from 'react-native';
import Config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';

initializeKakaoSDK(Config.KAKAO_APP_KEY);

AppRegistry.registerComponent(appName, () => App);
