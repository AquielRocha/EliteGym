import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { YStack, Button } from 'tamagui';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 

const schema = z.object({
  email: z.string().email('Email inválido').min(6, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Alert.alert('Login bem-sucedido!', 'Você foi autenticado com sucesso.');
      setTimeout(() => {
        router.push('/(drawer)');
      }, 3000);
    } catch (error) {
      Alert.alert('Erro de login', 'Erro ao fazer login. Verifique suas credenciais.');
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://png.pngtree.com/background/20230618/original/pngtree-fitness-gym-s-3d-renderings-of-treadmills-or-running-machines-picture-image_3751253.jpg' }}
      style={styles.background}
    >
      <YStack flex={1} justifyContent="center" alignItems="center" padding={16}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerContent}>
            <MaterialIcons name="fitness-center" size={24} color="#fff" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>EliteGym</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>
          <Text style={styles.cardSubtitle}>Sign in to your account.</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Senha"
                style={styles.input}
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          
          <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
            Entrar
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerContent}>
            <MaterialIcons name="fitness-center" size={24} color="#fff" style={styles.footerIcon} />
            <Text style={styles.footerText}>EliteGym</Text>
          </TouchableOpacity>
        </View>
      </YStack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 20,
  },
  footer: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  footerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  error: {
    color: '#F44336',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Login;
