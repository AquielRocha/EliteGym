import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Configurações' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/two.tsx" title="Configurações" />
      </Container>
    </>
  );
}
