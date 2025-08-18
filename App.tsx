import React from 'react';
import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Test from '@/screens/Test';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <Test />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
