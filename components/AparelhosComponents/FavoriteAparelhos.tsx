import React from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import CardAparelho from '../../src/app/(drawer)/(aparelhos)/CardAparelho'; 

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  manutencao: boolean;
}


interface FavoriteAparelhosProps {
  aparelhos: Aparelho[];
}

const FavoriteAparelhos: React.FC<FavoriteAparelhosProps> = ({ aparelhos }) => {
  if (!aparelhos || !Array.isArray(aparelhos)) {
    return <Text style={styles.placeholder}>Erro ao carregar os aparelhos favoritos.</Text>;
  }

  return (
    <FlatList
      data={aparelhos}
      keyExtractor={(item) => {
        if (!item.id) {
          console.warn('Aparelho sem ID encontrado:', item);
          return Math.random().toString();
        }
        return item.id.toString();
      }}
      renderItem={({ item }) => (
        <CardAparelho
          aparelho={item}
          onEdit={() => {}}
          onDelete={() => {}}
          onFavorite={() => {}}
          isFavorite={true}
        />
      )}
      ListEmptyComponent={() => (
        <Text style={styles.placeholder}>Nenhum aparelho favorito adicionado ainda.</Text>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoriteAparelhos;
