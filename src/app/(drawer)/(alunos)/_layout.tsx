import { Tabs } from 'expo-router';

export default function AlunosLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, 
      }}
    >
    </Tabs>
  );
}
