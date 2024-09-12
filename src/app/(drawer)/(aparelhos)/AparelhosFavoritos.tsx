import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, Alert, LayoutAnimation, UIManager, Platform, Animated } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import CardAparelho from './CardAparelho';
import CustomSelect from '~/components/CustomSelect';
import { useQueryGetAllAparelhos } from '~/src/hooks/Aparelhos/useQueryGetAllAparelhos';
import { useDeleteAparelho, useEditAparelho } from '~/src/hooks/Aparelhos/Mutations/useMutationEditAparelho';
import { TabView, SceneMap } from 'react-native-tab-view';
import FavoriteAparelhos from '../../../../components/AparelhosComponents/FavoriteAparelhos';

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
  const [favoriteAparelhos, setFavoriteAparelhos] = useState<number[]>([]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'Todos' },
    { key: 'maintenance', title: 'Manutenção' },
    { key: 'favorites', title: 'Favoritos' },  // Tab para favoritos
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

  const toggleFavorite = (id: number) => {
    setFavoriteAparelhos((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id]
    );
  };

  const aparelhos: Aparelho[] = data || [];
  const filteredAparelhos = selectedCategory === 'todos' 
    ? aparelhos.filter((aparelho) => !aparelho.manutencao) 
    : aparelhos.filter((aparelho) => aparelho.categoria === selectedCategory && !aparelho.manutencao);

  const aparelhosEmManutencao = aparelhos.filter(aparelho => aparelho.manutencao);

  const favoriteAparelhosList = aparelhos.filter(aparelho => favoriteAparelhos.includes(aparelho.id));

  const renderAparelhosGrid = (items: Aparelho[]) => (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {items.map((aparelho) => (
        <Animated.View key={aparelho.id} style={{...styles.card, opacity: fadeAnim}}>
          <CardAparelho
                  aparelho={aparelho}
                  onFavorite={() => toggleFavorite(aparelho.id)}
                  isFavorite={favoriteAparelhos.includes(aparelho.id)} onEdit={function (): void {
                      throw new Error('Function not implemented.');
                  } } onDelete={function (): void {
                      throw new Error('Function not implemented.');
                  } }          />
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

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          all: () => renderAparelhosGrid(filteredAparelhos),
          maintenance: () => renderAparelhosGrid(aparelhosEmManutencao),
          favorites: () => <FavoriteAparelhos aparelhos={favoriteAparelhosList} />,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: 100 }}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: '48%',
    marginBottom: 15,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
  },
});
