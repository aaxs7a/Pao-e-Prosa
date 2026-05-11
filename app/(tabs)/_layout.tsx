import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrinho" // Deve ser exatamente o nome do arquivo que você renomeou
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => (
      // Aqui você pode usar um ícone de carrinho diferente, se quiser
          <IconSymbol size={28} name="cart.fill" color={color} />
    ),
  }}
/>
    </Tabs>
  );
}
