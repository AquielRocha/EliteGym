

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Button, YStack, Text } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoCard from '~/components/InfoCard';

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  tipo: string;
  video: string;
}

interface CardAulaProps {
  aula: Aula;
  onEdit: () => void;
  onDelete: () => void;
}

const CardAula: React.FC<CardAulaProps> = ({ aula, onEdit, onDelete }) => {
  const handleOpenYouTube = () => {
    if (aula.video) {
      Linking.openURL(aula.video);
    }
  };

  
  return (
    <YStack padding="$4" space="$2" style={styles.cardContainer}>
      {/* <InfoCard title={aula.nome} description={aula.descricao} /> */}
      <View>
        <Text fontWeight="bold" fontSize="$6">
          {aula.nome}
        </Text>
        <Text color="$gray10" fontSize="$4">
          {aula.descricao}
        </Text>
      </View>
    
      {aula.foto ? (
        <View >
          <Image
            source={{ uri: aula.foto }}
            style={[styles.image]}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View >
          <Text>Imagem não disponível</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button onPress={handleOpenYouTube} size="$3" style={styles.iconButton}>
          <FontAwesome name="youtube" size={24} color="black" />
        </Button>
        <Button onPress={onEdit} size="$3" style={styles.iconButton}>
          <FontAwesome name="edit" size={24} color="black" />
        </Button>
        <Button onPress={onDelete} size="$3" style={styles.iconButton}>
          <MaterialIcons name="delete-outline" size={24} color="black" />
        </Button>
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
 
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 4,
  },
});

export default CardAula;
