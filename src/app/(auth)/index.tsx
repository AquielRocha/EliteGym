import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { YStack } from 'tamagui';

const AuthIndexScreen = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/(auth)/login'); // Navega para a tela de login
  };

  const goToRegister = () => {
    router.push('/(auth)/register'); // Navega para a tela de registro
  };
  const goToAcessoFacil = () => {
    router.push('/(drawer)'); // Navega para a tela de registro
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding={16} >
      <Text >
        Bem-vindo a Elite Gym
      </Text>


      <YStack space={16}>
        <TouchableOpacity onPress={goToLogin} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#007bff', borderRadius: 8, padding: 16 }}>
          <FontAwesome name="sign-in" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Login
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={goToRegister} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#6c757d', borderRadius: 8, padding: 16 }}>
          <FontAwesome name="user-plus" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToAcessoFacil} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#6c757d', borderRadius: 8, padding: 16 }}>
          <FontAwesome name="user-plus" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Acesso Facil
          </Text>
        </TouchableOpacity>
      </YStack>
    </YStack>
  );
};

export default AuthIndexScreen;
