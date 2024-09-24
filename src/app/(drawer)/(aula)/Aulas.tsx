import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryGetAll } from '~/src/hooks/Aulas/useQuerygetAllAulas';
import { useDeleteAula, useEditAula } from '~/src/hooks/Aulas/Mutations/useMutationeditAula';
import CardAula from '~/components/AulaComponents/CardAula';

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  tipo: string;
  video: string;
}

export default function ListarAulas() {
  const { data, error, isLoading, refetch } = useQueryGetAll();
  const deleteAula = useDeleteAula();
  const editAula = useEditAula();
  const [loadingReload, setLoadingReload] = useState(false); // Estado para o carregamento do botão de reload

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

  
  const handleReload = async () => {
    setLoadingReload(true);
    await refetch();
    setLoadingReload(false);
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

  const aulas: Aula[] = data || [];

  return (
    <YStack padding="$4" flex={1}>
      <YStack flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$5" fontWeight="bold">
          Aulas 
        </Text>
        <Button onPress={handleReload}>
          {loadingReload ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Ionicons name="reload-outline" size={24} color="white" />
          )}
        </Button>
      </YStack>
      <ScrollView>
        {aulas.length > 0 ? (
          aulas.map((aula) => (
            <YStack key={aula.id} padding="$2" space="$2">
              {editing?.id === aula.id ? (
                <YStack space="$2">
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <Input
                      placeholder="Nome"
                      value={editedAula?.nome || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, nome: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descrição</Text>
                    <Input
                      placeholder="Descrição"
                      value={editedAula?.descricao || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, descricao: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Foto</Text>
                    <Input
                      placeholder="URL da Foto"
                      value={editedAula?.foto || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, foto: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo</Text>
                    <Input
                      placeholder="Tipo"
                      value={editedAula?.tipo || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, tipo: text } : null))}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Vídeo</Text>
                    <Input
                      placeholder="URL do Vídeo"
                      value={editedAula?.video || ''}
                      onChangeText={(text) => setEditedAula((prev) => (prev ? { ...prev, video: text } : null))}
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
                <CardAula
                  aula={aula}
                  onEdit={() => handleEdit(aula)}
                  onDelete={() => handleDelete(aula.id)}
                />
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
