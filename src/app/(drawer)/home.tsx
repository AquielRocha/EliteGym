import { Stack } from 'expo-router';
import { View, Text, YStack, Button } from 'tamagui';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <Container>
      <YStack padding="$4"  space="$4">
        {/* Cabeçalho */}
        <YStack>
          <Text fontSize="$6" fontWeight="bold" color="$white" marginBottom="$2">
            Bem-vindo ao EliteGym
          </Text>
          <Text fontSize="$4" color="$white">
            Seu painel de gerenciamento de academias
          </Text>
        </YStack>

        {/* Seção de Estatísticas */}
        <YStack space="$4">
          <YStack padding="$4" backgroundColor="$primaryLight" >
            <Text fontSize="$5" fontWeight="bold" color="$primaryDark">
              Estatísticas Rápidas
            </Text>
            <YStack space="$2" marginTop="$2">
              <YStack space="$2">
                <Text fontSize="$4" color="$white">
                  Total de Alunos: 120
                </Text>
                <Text fontSize="$4" color="$white">
                  Total de Turmas: 15
                </Text>
                <Text fontSize="$4" color="$white">
                  Total de Instrutores: 10
                </Text>
              </YStack>
            </YStack>
          </YStack>

          {/* Ações Rápidas */}
          <YStack padding="$4" backgroundColor="$secondaryLight" >
            <Text fontSize="$5" fontWeight="bold" color="$secondaryDark">
              Ações Rápidas
            </Text>
            <YStack space="$2" marginTop="$2">
              <Button size="$3" backgroundColor="$primary" color="$white">
                Adicionar Novo Aluno
              </Button>
              <Button size="$3" backgroundColor="$primary" color="$white">
                Criar Nova Turma
              </Button>
              <Button size="$3" backgroundColor="$primary" color="$white">
                Gerenciar Instrutores
              </Button>
            </YStack>
          </YStack>
        </YStack>

        {/* Divisória */}
        <View height={1} backgroundColor="$border"  />

        {/* Atualizações ou Notícias */}
        <YStack padding="$4" backgroundColor="$tertiaryLight" >
          <Text fontSize="$5" fontWeight="bold" color="$tertiaryDark">
            Atualizações Recentes
          </Text>
          <YStack space="$2" marginTop="$2">
            <Text fontSize="$4" color="$white">
              - Novo curso de Yoga disponível!
            </Text>
            <Text fontSize="$4" color="$white">
              - Promoção de verão: 20% de desconto em matrículas.
            </Text>
            <Text fontSize="$4" color="$white">
              - Novo instrutor de pilates se juntou à equipe.
            </Text>
          </YStack>
        </YStack>
      </YStack>
    </Container>
  );
}
