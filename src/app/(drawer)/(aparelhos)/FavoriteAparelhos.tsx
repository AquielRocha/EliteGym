import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoriteAparelhos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aparelhos Favoritos</Text>
      {/* Aqui você pode adicionar a lista de aparelhos favoritos */}
      <Text style={styles.placeholder}>Nenhum aparelho favorito adicionado ainda.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#777',
  },
});

export default FavoriteAparelhos;
