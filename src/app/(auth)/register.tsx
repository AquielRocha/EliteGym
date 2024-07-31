import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from '../../api/axiosConfig'; // Ajuste o caminho conforme necessário

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('register', { email, password });
      Alert.alert('Registration Success', `Welcome ${response.data.name}`);
      // Navegue para a tela de login ou outra tela
    } catch (error) {
      Alert.alert('Registration Error', 'Unable to register.');
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
