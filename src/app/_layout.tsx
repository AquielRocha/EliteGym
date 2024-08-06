import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import config from '../../tamagui.config';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)/index', // Define a tela principal da pasta (auth)
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  // Crie uma instância do QueryClient
  const queryClient = new QueryClient();

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            {/* Telas de Autenticação */}
            <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/LandingPage" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

            {/* Outras Telas e Modais */}
            <Stack.Screen name="info/modal" options={{ title: 'fodase', presentation: 'modal' }} />
            <Stack.Screen name="info/aulas" options={{ title: 'Detalhes', presentation: 'modal' }} />
            <Stack.Screen name="info/opcoes" options={{ title: 'opções', presentation: 'modal' }} />
            <Stack.Screen name="info/aparelhos" options={{ title: 'Detalhes da página', presentation: 'modal' }} />
            <Stack.Screen name="info/financeiro" options={{ title: 'Detalhes da página', presentation: 'modal' }} />
            <Stack.Screen name="info/usuarios" options={{ title: 'Detalhes da página', presentation: 'modal' }} />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
