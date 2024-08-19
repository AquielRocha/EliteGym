import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import CardAparelho from './CardAparelho';
import { useDeleteAparelho, useEditAparelho } from '~/src/hooks/Aparelhos/Mutations/useMutationEditAparelho';
import MaintenanceSelect from '~/components/Select';
import { useQueryGetAllAparelhos } from '~/src/hooks/Aparelhos/useQueryGetAllAparelhos';

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  manutencao: boolean;
}

export default function ListarAparelhos() {
  const { data, error, isLoading, refetch } = useQueryGetAllAparelhos();
  const deleteAparelho = useDeleteAparelho();
  const editAparelho = useEditAparelho();

  const [editing, setEditing] = useState<Aparelho | null>(null);
  const [editedAparelho, setEditedAparelho] = useState<Aparelho | null>(null);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este aparelho?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteAparelho.mutate(id),
        },
      ]
    );
  };

  const handleEdit = (aparelho: Aparelho) => {
    setEditing(aparelho);
    setEditedAparelho({ ...aparelho });
  };

  const handleSave = () => {
    if (editedAparelho) {
      editAparelho.mutate(editedAparelho);
      setEditing(null);
    }
  };

  if (isLoading) {
    return (
      <YStack padding="$4" flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$5" fontWeight="bold" marginBottom="$3">
          Aparelhos
        </Text>
        <Text>Carregando...</Text>
      </YStack>
    );
  }

  if (error) {
    console.error('Erro ao carregar aparelhos:', error);
    return (
      <YStack padding="$4" flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$5" fontWeight="bold" marginBottom="$3">
          Aparelhos
        </Text>
        <Text>Erro ao carregar aparelhos</Text>
      </YStack>
    );
  }

  const aparelhos: Aparelho[] = data || [];

  return (
    <YStack padding="$4" flex={1}>
      <YStack flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$5" fontWeight="bold">
          Aparelhos
        </Text>
        <Button size="$3" onPress={() => refetch()} style={styles.iconButton}>
          <Ionicons name="reload-outline" size={24} color="black" />
        </Button>
      </YStack>
      <ScrollView>
        {aparelhos.length > 0 ? (
          aparelhos.map((aparelho) => (
            <YStack key={aparelho.id} padding="$2" space="$2">
              {editing?.id === aparelho.id ? (
                <YStack space="$2">
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <Input
                      placeholder="Nome"
                      value={editedAparelho?.nome || ''}
                      onChangeText={(text) => setEditedAparelho((prev) => (prev ? { ...prev, nome: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descrição</Text>
                    <Input
                      placeholder="Descrição"
                      value={editedAparelho?.descricao || ''}
                      onChangeText={(text) => setEditedAparelho((prev) => (prev ? { ...prev, descricao: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Foto</Text>
                    <Input
                      placeholder="URL da Foto"
                      value={editedAparelho?.foto || ''}
                      onChangeText={(text) => setEditedAparelho((prev) => (prev ? { ...prev, foto: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <MaintenanceSelect
                      value={editedAparelho?.manutencao || false}
                      onValueChange={(value) => setEditedAparelho((prev) => (prev ? { ...prev, manutencao: value } : null))}
                    />
                  </View>
                  <YStack flexDirection="row" space="$2" justifyContent="space-between">
                    <Button onPress={handleSave} size="$3" style={styles.saveButton}>
                      Salvar
                    </Button>
                    <Button onPress={() => setEditing(null)} size="$3" style={styles.cancelButton}>
                      Cancelar
                    </Button>
                  </YStack>
                </YStack>
              ) : (
                <CardAparelho
                  Aparelho={aparelho}
                  onEdit={() => handleEdit(aparelho)}
                  onDelete={() => handleDelete(aparelho.id)}
                />
              )}
            </YStack>
          ))
        ) : (
          <Text>Nenhum aparelho disponível</Text>
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
  iconButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 4,
  },
  saveButton: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});
