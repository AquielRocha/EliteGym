import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, Alert, LayoutAnimation, UIManager, Platform, Animated } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import CardAparelho from './CardAparelho';
import CustomSelect from '~/components/CustomSelect';
import { useQueryGetAllAparelhos } from '~/src/hooks/Aparelhos/useQueryGetAllAparelhos';
import { useDeleteAparelho, useEditAparelho } from '~/src/hooks/Aparelhos/Mutations/useMutationEditAparelho';
import { TabView, SceneMap } from 'react-native-tab-view';

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  manutencao: boolean;
  categoria: string;
}

export default function ListarAparelhos() {
  const { data, error, isLoading, refetch } = useQueryGetAllAparelhos();
  const deleteAparelho = useDeleteAparelho();
  const editAparelho = useEditAparelho();

  const [editing, setEditing] = useState<Aparelho | null>(null);
  const [editedAparelho, setEditedAparelho] = useState<Aparelho | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'braços' | 'pernas' | 'costas' | 'outros' | 'todos'>('todos');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'Todos' },
    { key: 'maintenance', title: 'Manutenção' }
  ]);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, [index, selectedCategory]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este aparelho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => deleteAparelho.mutate(id) },
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
        <Text fontSize="$5" fontWeight="bold" color="#333" marginBottom="$3">Aparelhos</Text>
        <Text>Carregando...</Text>
      </YStack>
    );
  }

  if (error) {
    console.error('Erro ao carregar aparelhos:', error);
    return (
      <YStack padding="$4" flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$5" fontWeight="bold" color="#333" marginBottom="$3">Aparelhos</Text>
        <Text color="red">Erro ao carregar aparelhos</Text>
      </YStack>
    );
  }

  const aparelhos: Aparelho[] = data || [];
  const filteredAparelhos = selectedCategory === 'todos' 
    ? aparelhos.filter((aparelho) => !aparelho.manutencao) 
    : aparelhos.filter((aparelho) => aparelho.categoria === selectedCategory && !aparelho.manutencao);

  const aparelhosEmManutencao = aparelhos.filter(aparelho => aparelho.manutencao);

  const renderAparelhosGrid = (items: Aparelho[]) => (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {items.map((aparelho) => (
        <Animated.View key={aparelho.id} style={{...styles.card, opacity: fadeAnim}}>
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
              <CustomSelect
                value={selectedCategory || 'todos'}
                onValueChange={(value) => setSelectedCategory(value as 'braços' | 'pernas' | 'costas' | 'outros' | 'todos')}
                items={[
                  { label: 'Todos', value: 'todos' },
                  { label: 'Braços', value: 'braços' },
                  { label: 'Pernas', value: 'pernas' },
                  { label: 'Costas', value: 'costas' },
                  { label: 'Outros', value: 'outros' },
                ]}
                placeholder={{ label: 'Selecione a categoria', value: 'todos' }}
              />
              <YStack flexDirection="row" space="$2" justifyContent="space-between">
                <Button onPress={handleSave} size="$3" style={styles.saveButton}>Salvar</Button>
                <Button onPress={() => setEditing(null)} size="$3" style={styles.cancelButton}>Cancelar</Button>
              </YStack>
            </YStack>
          ) : (
            <CardAparelho
              Aparelho={aparelho}
              onEdit={() => handleEdit(aparelho)}
              onDelete={() => handleDelete(aparelho.id)}
            />
          )}
        </Animated.View>
      ))}
    </ScrollView>
  );

  return (
    <YStack padding="$4" flex={1}>
      <YStack flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$5" fontWeight="bold" color="#333">Aparelhos</Text>
        <Button size="$3" onPress={() => refetch()} style={styles.iconButton}>
          <Ionicons name="reload-outline" size={24} color="black" />
        </Button>
      </YStack>
      
      <View style={styles.selectContainer}>
        <CustomSelect
          value={selectedCategory || 'todos'} 
          onValueChange={(value) => setSelectedCategory(value as 'braços' | 'pernas' | 'costas' | 'outros' | 'todos')}
          items={[
            { label: 'Todos', value: 'todos' },
            { label: 'Braços', value: 'braços' },
            { label: 'Pernas', value: 'pernas' },
            { label: 'Costas', value: 'costas' },
            { label: 'Outros', value: 'outros' },
          ]}
          placeholder={{ label: 'Selecione a categoria', value: 'todos' }}
        />
      </View>

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          all: () => renderAparelhosGrid(filteredAparelhos),
          maintenance: () => renderAparelhosGrid(aparelhosEmManutencao),
        })}
        onIndexChange={setIndex}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    marginBottom: 15,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectContainer: {
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});
