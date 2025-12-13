import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import MainStack from '@/navigation/RootNavigator';
import OnboardRoute from '@/navigation/stacks/OnboardStackNavigation';
import { AppProviders } from '@/providers/AppProviders';
import { useUserStore } from '@/shared/stores/user';

function App() {
  const refreshToken = useUserStore(state => state.refreshToken);

  return (
    <AppProviders>
      <NavigationContainer key={refreshToken ? 'authenticated' : 'guest'}>
        {refreshToken ? <MainStack /> : <OnboardRoute />}
      </NavigationContainer>
    </AppProviders>
  );
}

export default App;
