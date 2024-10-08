import React, { useState } from 'react';
import { ScrollView, StyleSheet, Pressable, View, ActivityIndicator } from 'react-native';
import { Button, Text, YStack, Image } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryGetAllAlunos } from '~/src/hooks/Alunos/useQueryGetAllAlunos';
import { Aluno } from '~/src/hooks/Alunos/useQueryGetAllAlunos';
import AlunoModal from '../../../../components/AlunosComponents/ModalAlunos';
import { useNavigation } from '@react-navigation/native';

export default function AlunosList() {
  const { data, error, isLoading, refetch } = useQueryGetAllAlunos();
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingReload, setLoadingReload] = useState(false); // Estado para o carregamento do botão de reload

  const navigation = useNavigation();

  const handleAlunoPress = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setModalVisible(true);
  };

  const handleAddAlunoPress = () => {
    //@ts-ignore
    navigation.navigate('addAlunos');
  };

  const handleReload = async () => {
    setLoadingReload(true);
    await refetch();
    setLoadingReload(false);
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        {/* spinner tlgd */}
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Erro ao carregar dados.</Text>
        <Button onPress={() => refetch()}>
          <Ionicons name="reload-outline" size={24} color="white" />
          <Text> Tentar novamente</Text>
        </Button>
      </YStack>
    );
  }

  return (
    <YStack padding="$4" flex={1}>
      <YStack flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$5" fontWeight="bold">Usuários</Text>
        <Button onPress={handleAddAlunoPress} style={styles.addButton}>
          <Ionicons name="add-outline" size={24} color="black" />
          <Text style={styles.addButtonText}>Adicionar Aluno</Text>
        </Button>
        {/* Exibindo spinner no botão de reload enquanto está recarregando */}
        <Button onPress={handleReload}>
          {loadingReload ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Ionicons name="reload-outline" size={24} color="white" />
          )}
        </Button>
      </YStack>

      <ScrollView>
        {data && data.map((aluno: Aluno) => (
          <Pressable key={aluno.id} onPress={() => handleAlunoPress(aluno)}>
            <YStack padding="$4" borderWidth={1} borderColor="#ddd" marginBottom="$4" borderRadius="$2" backgroundColor="white">
              <YStack flexDirection="row" alignItems="center">
                {/* ,` */}
                <Image 
                  src={aluno.foto} 
                  width={60} 
                  height={60} 
                  borderRadius={30} 
                  alt="Foto do aluno"
                />
                <YStack marginLeft="$4">
                  <Text fontWeight="bold" fontSize="$4">{aluno.nome} - {aluno.tipo}</Text>
                  <Text>Email: {aluno.email}</Text>
                  <Text>Telefone: {aluno.telefone}</Text>
                </YStack>
              </YStack>
            </YStack>
          </Pressable>
        ))}
      </ScrollView>

      <AlunoModal
        visible={modalVisible}
        aluno={selectedAluno}
        onClose={() => {
          setModalVisible(false);
          setSelectedAluno(null); // Limpa a seleção ao fechar o modal
        }}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'black',
    marginLeft: 5,
  },
});
