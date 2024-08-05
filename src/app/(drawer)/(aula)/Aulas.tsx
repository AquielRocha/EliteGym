import React, { useState } from 'react';
import { Button, ScrollView, View, YStack } from 'tamagui';
import { Text } from 'tamagui';
import Spacer from '~/components/Spacer';
import TextInput from '~/components/TextInput';
import { useAulas } from '../../../hooks/useAulas';
import { useDeleteAula, useEditAula } from '../../../Mutation/useMutationeditAula'; // Atualize o caminho conforme necessário
import { Alert } from 'react-native';

// Define o tipo dos dados esperados
interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  tipo: string;
  video: string;
}

export default function ListarAulas() {
  const { data, error, isLoading } = useAulas();
  const deleteAula = useDeleteAula();
  const editAula = useEditAula();

  const [editing, setEditing] = useState<Aula | null>(null);
  const [editedAula, setEditedAula] = useState<Aula | null>(null);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta aula?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteAula.mutate(id),
        },
      ]
    );
  };

  const handleEdit = (aula: Aula) => {
    setEditing(aula);
    setEditedAula({ ...aula });
  };

  const handleSave = () => {
    if (editedAula) {
      editAula.mutate(editedAula);
      setEditing(null);
    }
  };

  if (isLoading) {
    return (
      <YStack padding="$4">
        <Text fontSize="$5" fontWeight="bold" color="$white" marginBottom="$3">
          Aulas da Academia
        </Text>
        <View>
          <Text>Carregando...</Text>
        </View>
      </YStack>
    );
  }

  if (error) {
    console.error('Erro ao carregar aulas:', error);
    return (
      <YStack padding="$4">
        <Text fontSize="$5" fontWeight="bold" color="$white" marginBottom="$3">
          Aulas da Academia
        </Text>
        <View>
          <Text>Erro ao carregar aulas</Text>
        </View>
      </YStack>
    );
  }

  const aulas: Aula[] = data || [];

  return (
    <YStack padding="$4">
      <Text fontSize="$5" fontWeight="bold" color="$white" marginBottom="$3">
        Aulas da Academia
      </Text>
      <ScrollView>
        {aulas.length > 0 ? (
          aulas.map((aula) => (
            <YStack key={aula.id} padding="$2" borderBottomWidth={1} borderBottomColor="$gray" space="$2">
              {editing?.id === aula.id ? (
                <YStack space="$2">
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Nome"
                      value={editedAula?.nome || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, nome: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Descrição"
                      value={editedAula?.descricao || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, descricao: text } : null))}
                    />
                  </View>
                  <YStack flexDirection="row" space="$2">
                    <Button onPress={handleSave}>Salvar</Button>
                    <Spacer />
                    <Button onPress={() => setEditing(null)} color="gray">
                      Cancelar
                    </Button>
                  </YStack>
                </YStack>
              ) : (
                <YStack space="$2">
                  <Text fontSize="$4" fontWeight="bold" color="$white">
                    {aula.nome}
                  </Text>
                  <Text color="$lightGray">{aula.descricao}</Text>
                  <YStack flexDirection="row" space="$2">
                    <Button onPress={() => handleEdit(aula)}>Editar</Button>
                    <Spacer />
                    <Button onPress={() => handleDelete(aula.id)} color="red">
                      Deletar
                    </Button>
                  </YStack>
                </YStack>
              )}
            </YStack>
          ))
        ) : (
          <Text>Nenhuma aula disponível</Text>
        )}
      </ScrollView>
    </YStack>
  );
}

const styles = {
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
};
