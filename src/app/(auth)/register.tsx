// src/components/Register.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import Toast from '../../../components/Toast';
import { router } from 'expo-router';

const schema = z.object({
  email: z.string().email('Email inválido').min(10,'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [error, setError] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<'success' | 'error'>('success');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setToastMessage('Registro bem-sucedido!');
      setToastStatus('success');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        router.push('/(auth)/login');
      }, 3000);
    } catch (error) {
      setToastMessage('Erro ao registrar. Tente novamente.');
      setToastStatus('error');
      setToastVisible(true);
      //@ts-ignore
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      
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
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      
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
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
      
      {toastVisible && (
        <Toast
          title={toastMessage}
          status={toastStatus}
          duration={3000}
          onClose={() => setToastVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default Register;
