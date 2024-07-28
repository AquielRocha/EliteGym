import { Entypo, Feather, Fontisto, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';

export default function FinanceiroLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
      {/* <Tabs.Screen
        name="aula"
        options={{
          title: 'Aula',
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
        }}
      /> */}
        <Tabs.Screen
          name="config"
          options={{
            title: 'Config',
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Conta',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
