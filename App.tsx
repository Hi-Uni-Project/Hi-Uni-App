import React from 'react';

import MainStack from '@/navigation/RootNavigator';
import { AppProviders } from '@/providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <MainStack />
    </AppProviders>
  );
}

export default App;
