import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Spacer from '~/components/Spacer';
import { useAulas } from '../../../hooks/useAulas';
import { useDeleteAula, useEditAula } from '../../../hooks/Aulas/Mutations/useMutationeditAula'; // Atualize o caminho conforme necessário

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  tipo: string;
  video: string;
}

export default function ListarAulas() {
  const { data, error, isLoading, refetch } = useAulas();
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
      <YStack padding="$4" flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$5" fontWeight="bold" marginBottom="$3">
          Aulas da Academia
        </Text>
        <Text>Carregando...</Text>
      </YStack>
    );
  }

  if (error) {
    console.error('Erro ao carregar aulas:', error);
    return (
      <YStack padding="$4" flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$5" fontWeight="bold" marginBottom="$3">
          Aulas da Academia
        </Text>
        <Text>Erro ao carregar aulas</Text>
      </YStack>
    );
  }

  const aulas: Aula[] = data || [];

  return (
    <YStack padding="$4" flex={1}>
      <YStack flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$5" fontWeight="bold">
          Aulas da Academia
        </Text>
        <Button size="$3" onPress={() => refetch()}>
          Reload
        </Button>
      </YStack>
      <ScrollView>
        {aulas.length > 0 ? (
          aulas.map((aula) => (
            <YStack key={aula.id} padding="$2" borderBottomWidth={1} space="$2">
              {editing?.id === aula.id ? (
                <YStack space="$2">
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <Input
                      placeholder="Nome"
                      value={editedAula?.nome || ''}
                      onChangeText={(text: any) => setEditedAula((prev) => (prev ? { ...prev, nome: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descrição</Text>
                    <Input
                      placeholder="Descrição"
                      value={editedAula?.descricao || ''}
                      onChangeText={(text: any) => setEditedAula((prev) => (prev ? { ...prev, descricao: text } : null))}
                    />
                  </View>
                  <YStack flexDirection="row" space="$2" justifyContent="space-between">
                    <Button onPress={handleSave} size="$3">
                      Salvar
                    </Button>
                    <Spacer />
                    <Button onPress={() => setEditing(null)} size="$3">
                      Cancelar
                    </Button>
                  </YStack>
                </YStack>
              ) : (
                <YStack space="$2">
                  <Text fontSize="$4" fontWeight="bold">
                    {aula.nome}
                  </Text>
                  <Text>{aula.descricao}</Text>
                  <YStack flexDirection="row" space="$2" justifyContent="space-between">
                    <Button onPress={() => handleEdit(aula)} size="$3">
                      Editar
                    </Button>
                    <Spacer />
                    <Button onPress={() => handleDelete(aula.id)} size="$3">
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

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});
