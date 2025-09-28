import React from 'react';

import MainStack from '@/navigation/RootNavigator';
import { AppProviders } from '@/providers/AppProviders';
import { useBootSplash } from '@/shared/hooks/useBootSplash';

function App() {
  useBootSplash(2000);

  return (
    <AppProviders>
      <MainStack />
    </AppProviders>
  );
}

export default App;
