import React, { ReactNode } from 'react';

import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DropdownProvider } from '@/shared/components/DropdownProvider';
import { useBootSplash } from '@/shared/hooks/useBootSplash';

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  useBootSplash(2000);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <PortalProvider>
              <DropdownProvider>{children}</DropdownProvider>
            </PortalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
