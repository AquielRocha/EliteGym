import { View, Text, YStack } from 'tamagui';

export default function ListarAulas() {
  return (
    <YStack padding="$4" >
      <Text fontSize="$5" fontWeight="bold" color="$white" marginBottom="$3">
        Aulas da Academia
      </Text>
      <View>
        <Text>aqui vc pode ver todas as aulas disponiveis</Text>
      </View>
    </YStack>
  );
}
