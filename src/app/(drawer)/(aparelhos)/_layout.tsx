import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AparelhoLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tabs.Screen
        name="Aparelhos"
        options={{
          title: 'Aparelhos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="IncluirAparelhos"
        options={{
          title: 'Incluir Aparelhos',
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="AparelhosFavoritos"
        options={{
          title: 'Aparelhos Favoritos',
          tabBarIcon: ({ color }) => (
            <Entypo name="heart-outlined" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
