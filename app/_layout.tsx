import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { CartProvider } from './context/CartContext'; 

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            // Isso remove a barra de título automática do sistema de todas as telas
            headerShown: false,
          }}
        >
          {/* Tela principal das abas */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Tela de categorias (fora das abas) */}
          <Stack.Screen name="categorias" options={{ headerShown: false }} />
          
          {/* Tela de modal (se existir no seu projeto) */}
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        
        <StatusBar style="auto" />
      </ThemeProvider>
    </CartProvider>
  );
}