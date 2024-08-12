import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Usando FontAwesome5
import { YStack, Button } from 'tamagui'; // Importando Button do Tamagui
import { useRouter } from 'expo-router';

const LandingPage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login'); // Navega para a tela de login
  };

  const goToRegister = () => {
    router.push('/register'); // Navega para a tela de registro
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding={16} backgroundColor="#fff">
      <View style={styles.header}>
        <Image
        //   source={require('./path-to-your-dumbbell-icon.png')} // Substitua pelo caminho do seu ícone
          style={styles.icon}
        />
        <Text style={styles.title}>EliteGym</Text>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Elevate Your Fitness at EliteGym</Text>
        <Text style={styles.subheading}>Experience the ultimate in fitness and wellness at our state-of-the-art gym.</Text>
        <Button
          onPress={goToLogin}
          style={styles.button}
          size="$9"
        >
          <FontAwesome5 name="sign-in-alt" size={20} color="white" />
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <Button
          onPress={goToRegister}
          style={styles.button}
          size="$9"
        >
          <FontAwesome5 name="user-plus" size={20} color="white" />
          <Text style={styles.buttonText}>Register</Text>
        </Button>
      </View>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('./path-to-your-placeholder-image.png')} // Substitua pelo caminho da sua imagem
          style={styles.image}
        /> */}
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mainContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 500,
    borderRadius: 16,
    resizeMode: 'cover',
  },
});

export default LandingPage;
