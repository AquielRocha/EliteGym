import React from 'react';
import { View, Text, TextInput as RNTextInput, TextInputProps } from 'react-native'; // Importa o TextInput do react-native

// Define as propriedades do componente
interface CustomTextInputProps extends TextInputProps {
  label?: string;
}

// Componente CustomTextInput
const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, ...props }) => {
  return (
    <View style={{ padding: 8 }}>
      {label && <Text style={{ marginBottom: 4, fontWeight: 'bold', color: 'white' }}>{label}</Text>}
      <RNTextInput
        placeholderTextColor="#888"
        {...props}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 4,
          padding: 8,
          color: '#fff',
        }}
      />
    </View>
  );
};

export default CustomTextInput;
