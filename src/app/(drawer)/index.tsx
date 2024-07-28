import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { View, Text, YStack, Button } from 'tamagui';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Link } from 'expo-router';
import { Container } from '~/components/Container';
import { useRouter } from 'expo-router';


const screenWidth = Dimensions.get('window').width;

const barChartData = {
  labels: ['Alunos', 'Turmas', 'Instrutores'],
  datasets: [
    {
      data: [40, 6, 10],
    },
  ],
};

const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      data: [50, 70, 60, 90, 85],
    },
  ],
};

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack padding="$4" space="$4">
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
            <YStack padding="$4" backgroundColor="$primaryLight">
              <Text fontSize="$5" fontWeight="bold" color="$primaryDark">
                Estatísticas Rápidas
              </Text>
              <YStack space="$2" marginTop="$2">
                <BarChart
                  data={barChartData}
                  width={screenWidth - 32}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  yAxisLabel=""
                  yAxisSuffix=""
                  style={{ marginVertical: 8 }}
                />
              </YStack>
            </YStack>

            {/* Ações Rápidas */}
            <YStack padding="$4" backgroundColor="$secondaryLight">
              <Text fontSize="$5" fontWeight="bold" color="$secondaryDark">
                Ações Rápidas
              </Text>
              <YStack space="$2" marginTop="$2">
       
              <Button onPress={() => router.push('/Aulas')}>
                  Aulas
                </Button>

               
              </YStack>
            </YStack>
          </YStack>

          {/* Divisória */}
          <View height={1} backgroundColor="$border" />

          {/* Atualizações ou Notícias */}
          <YStack padding="$4" backgroundColor="$tertiaryLight">
            <Text fontSize="$5" fontWeight="bold" color="$tertiaryDark">
              Atualizações Recentes
            </Text>
            <YStack space="$2" marginTop="$2">
              <LineChart
                data={lineChartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  decimalPlaces: 2,
                }}
                style={{ marginVertical: 8 }}
              />
        
              <Text fontSize="$4" color="$white">
                - bla bla bla
              </Text>
              <Text fontSize="$4" color="$white">
                - Novo instrutor de comer xoxota se juntou a tropa dos comedores de casadas
              </Text>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </Container>
  );
}

// Estilos opcionais
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
