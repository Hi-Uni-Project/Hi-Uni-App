import React from 'react';

import MainStack from '@/navigation/RootNavigator';
import OnboardRoute from '@/navigation/stacks/OnboardStackNavigation';
import { AppProviders } from '@/providers/AppProviders';
import { useUserStore } from '@/shared/stores/user';

function App() {
  const { refreshToken } = useUserStore();

  return (
    <AppProviders>
      {refreshToken ? <MainStack /> : <OnboardRoute />}
    </AppProviders>
  );
}

export default App;
