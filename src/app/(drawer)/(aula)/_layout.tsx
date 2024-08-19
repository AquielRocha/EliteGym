import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AulaLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tabs.Screen
        name="Aulas"
        options={{
          title: 'Aulas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="weight-lifter" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="IncluirAulas"
        options={{
          title: 'Incluir Aulas',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
