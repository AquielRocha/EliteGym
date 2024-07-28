import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AulaLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
        <Tabs.Screen
          name="Aulas"
          options={{
            title: 'Listar Aulas',
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" size={24} color={color} />
            ),
          }}
        />

      <Tabs.Screen
        name="IncluirAulas"
        options={{
          title: 'Incluir Aulas',
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
