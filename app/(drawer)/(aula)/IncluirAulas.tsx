import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function IncluirAulas() {
  return (
    <>
      <Stack.Screen options={{ title: 'Incluir Aulas' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(aula)/IncluirAulas.tsx" title="Incluir Aulas" />
      </Container>
    </>
  );
}
