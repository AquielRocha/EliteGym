import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface SelectPickerProps {
  items: { label: string; value: string }[];
  placeholder?: { label: string; value: string };
  value: string;
  onValueChange: (value: string) => void;
}

const SelectPicker: React.FC<SelectPickerProps> = ({ items, placeholder, value, onValueChange }) => {
  // Definindo estilo para Android
  const androidStyles = StyleSheet.create({
    inputAndroid: {
      height: 50,
      width:250,
      borderColor: '#B0C4DE',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: 'white',
      color: 'black', // Cor do texto
    },
    placeholder: {
      color: 'gray', 
    },
  });

  return (
    <View style={{ marginVertical: 10 }}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        placeholder={placeholder || { label: 'Selecione uma opção...', value: '' }}
        style={
          Platform.OS === 'android'
            ? {
                inputAndroid: androidStyles.inputAndroid,
                placeholder: androidStyles.placeholder,
              }
            : undefined
        }
        useNativeAndroidPickerStyle={false} // Evita o estilo padrão no Android
      />
    </View>
  );
};

export default SelectPicker;
