import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Spacer from '~/components/Spacer';
import { useDeleteAula, useEditAula } from '../../../hooks/Aulas/Mutations/useMutationeditAula';
import { useQueryGetAll } from '~/src/hooks/Aulas/useQuerygetAllAulas';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
        <Button size="$3" onPress={() => refetch()} style={styles.outlineButton}>
          <Ionicons name="reload-outline" size={24} color="black" />
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
                    <Button onPress={handleSave} size="$3" style={styles.outlineButton}>
                      Salvar
                    </Button>
                    <Spacer />
                    <Button onPress={() => setEditing(null)} size="$3" style={styles.outlineButton}>
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
                    <Button onPress={() => handleEdit(aula)} size="$3" style={styles.outlineButton}>
                      <FontAwesome name="edit" size={24} color="black" />
                    </Button>
                    <Spacer />
                    <Button onPress={() => handleDelete(aula.id)} size="$3" style={styles.outlineButton}>
                      <MaterialIcons name="delete-outline" size={24} color="black" />
                    </Button>
                  </YStack>
                  <View style={styles.separator} />
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
  outlineButton: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc', 
    marginVertical: 10, 
  },
});
