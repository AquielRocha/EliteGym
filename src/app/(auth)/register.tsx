import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importando ícones

const schema = z.object({
  email: z.string().email('Email inválido').min(6, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      Alert.alert('Registro bem-sucedido!', 'Você foi registrado com sucesso.');
      setTimeout(() => {
        router.push('/(auth)/login');
      }, 3000);
    } catch (error) {
      Alert.alert('Erssro de registro', 'Erro ao registrar. Tente novamente.');
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://th.bing.com/th/id/OIG1.m8HwssLfo2p.GBuY0wQL?w=1024&h=1024&rs=1&pid=ImgDetMain' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="fitness-center" size={24} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>EliteGym</Text>
        </View>

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registro</Text>
          <Text style={styles.cardSubtitle}>Crie uma nova conta.</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Senha"
                style={styles.input}
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Confirmar Senha"
                style={styles.input}
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
          
          <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
            Registrar
          </Button>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerContent}>
            <MaterialIcons name="fitness-center" size={24} color="#fff" style={styles.footerIcon} />
            <Text style={styles.footerText}>EliteGym</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
  container: {
    padding: 16,
    flex: 1,
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
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
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
  footerIcon: {
    marginRight: 8,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: '#F44336',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 8,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Register;
