import React from 'react';

import RootStack from '@/navigation/RootNavigator';
import { AppProviders } from '@/providers/AppProviders';
import { useBootSplash } from '@/shared/hooks/useBootSplash';

function App() {
  useBootSplash(2000);

  return (
    <AppProviders>
      <RootStack />
    </AppProviders>
  );
}

export default App;
