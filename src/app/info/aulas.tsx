import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YStack } from 'tamagui';
import InfoCard from '~/components/InfoCard'; // Ajuste o caminho conforme necessário

export default function InfoAulas() {
  return (
    <YStack padding="$4" space="$4" flex={1}>
      <Text >
        Bem-vindo à Página de Aulas
      </Text>
      <InfoCard
        title="Adicionar Nova Aula"
        description="Você pode adicionar uma nova aula preenchendo os detalhes, incluindo foto, vídeo e uma descrição. Defina a data e salve a aula no sistema."
        
      />
      <InfoCard
        title="Editar Aula"
        description="Modifique as informações da aula existente. Altere a foto, vídeo, descrição e a data conforme necessário."
      />
      <InfoCard
        title="Excluir Aula"
        description="Remova uma aula que não é mais necessária. Selecione a aula e confirme a exclusão."
      />
      <InfoCard
        title="Visualizar Aulas"
        description="Na página principal, você pode ver a lista de todas as aulas cadastradas. Navegue pela lista para acessar os detalhes das aulas."
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
