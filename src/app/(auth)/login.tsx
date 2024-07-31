import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from '../../api/axiosConfig'; // Ajuste o caminho conforme necessário

const Loginn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('login', { email, password });
      Alert.alert('Login Success', `Welcome ${response.data.name}`);
      // Navegue para a próxima tela ou salve o token de autenticação, etc.
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Loginn;
