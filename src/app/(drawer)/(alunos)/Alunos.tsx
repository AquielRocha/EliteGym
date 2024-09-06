import React, { useState } from 'react';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { Button, Text, YStack, Image } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryGetAllAlunos } from '~/src/hooks/Alunos/useQueryGetAllAlunos';
import { Aluno } from "~/src/hooks/Alunos/useQueryGetAllAlunos"; // Substitua pelo caminho real do seu arquivo de tipos
import AlunoModal from '../../../../components/AlunosComponents/ModalAlunos';
import AddAlunoForm from '~/components/AlunosComponents/AlunosForm';

export default function AlunosList() {
  const { data, error, isLoading, refetch } = useQueryGetAllAlunos();
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showForm, setShowForm] = useState(false); // Novo estado para controlar a exibição do formulário

  const handleAlunoPress = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setModalVisible(true);
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
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
        <Text fontSize="$5" fontWeight="bold">
          Alunos
        </Text>
        <Button
        onPress={() => setShowForm(true)}
        style={{
          backgroundColor: 'white', 
          padding: 10,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name="add-outline" size={24} color="black" />
        <Text style={{ color: 'white', marginLeft: 5 }}>Adicionar Aluno</Text>
      </Button>
        <Button onPress={() => refetch()}>
          <Ionicons name="reload-outline" size={24} color="white" />
        </Button>
      </YStack>
      <ScrollView>
        {data && data.map((aluno: Aluno) => (
          <Pressable key={aluno.id} onPress={() => handleAlunoPress(aluno)}>
            <YStack padding="$4" borderWidth={1} borderColor="#ddd" marginBottom="$4" borderRadius="$2" backgroundColor="white">
              <YStack flexDirection="row" alignItems="center">
                <Image src={aluno.foto} width={60} height={60} borderRadius={30} />
                <YStack marginLeft="$4">
                  <Text fontWeight="bold" fontSize="$4">{aluno.nome}</Text>
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
          setSelectedAluno(null); // Opcional: Limpar a seleção ao fechar o modal
        }}
      />

      {/* Modal for adding new aluno */}
      {showForm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddAlunoForm />
            <Button      style={{
          backgroundColor: 'red', 
          padding: 10,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => setShowForm(false)}  >
          Sair</Button>
          </View>
        </View>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  alunoCard: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  alunoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 600,
  },
});
