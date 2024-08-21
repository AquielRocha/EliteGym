import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, YStack } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoCard from '~/components/InfoCard';

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  manutencao: boolean;
}

interface CardAparelhoProps {
  Aparelho: Aparelho;
  onEdit: () => void;
  onDelete: () => void;
}

const CardAparelho: React.FC<CardAparelhoProps> = ({ Aparelho, onEdit, onDelete }) => {
  console.log('Aparelho:', Aparelho); // Verifique os dados

  return (
    <YStack padding="$4" space="$2" style={styles.cardContainer}>
      <InfoCard title={Aparelho.nome} description={Aparelho.descricao} />
      
      {Aparelho.foto ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: Aparelho.foto }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Text>Imagem não disponível</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
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
  imageContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
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

export default CardAparelho;
