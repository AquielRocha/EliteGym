// src/components/Login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import Toast from '../../../components/Toast';
import { YStack } from 'tamagui';
import { useRouter } from 'expo-router';

const schema = z.object({
  email: z.string().email('Email inválido').min(6,'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [error, setError] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<'success' | 'error'>('success');
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setToastMessage('Login bem-sucedido!');
      setToastStatus('success');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        router.push('/(drawer)');
      }, 3000);
    } catch (error) {
      setToastMessage('Erro ao fazer login. Verifique suas credenciais.');
      setToastStatus('error');
      setToastVisible(true);
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding={16}>
      <View style={styles.card}>
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
        
        
        <Button title="Login" onPress={handleSubmit(onSubmit)} color="#007bff" />
      </View>
      
      {toastVisible && (
        <Toast
          title={toastMessage}
          status={toastStatus}
          duration={3000}
          onClose={() => setToastVisible(false)}
        />
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  error: {
    color: '#F44336',
    marginBottom: 10,
  },
});

export default Login;
