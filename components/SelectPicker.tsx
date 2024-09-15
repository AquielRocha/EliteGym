import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface SelectPickerProps {
  items: { label: string; value: string }[];
  placeholder?: { label: string; value: string };
  value: string;
  onValueChange: (value: string) => void;
}

const SelectPicker: React.FC<SelectPickerProps> = ({ items, placeholder, value, onValueChange }) => {
  const commonStyles = StyleSheet.create({
    inputContainer: {
      height: 48, // Altura padronizada igual ao FormField
      borderWidth: 1,
      borderColor: '#B0C4DE',
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    input: {
      color: '#000',
    },
    placeholder: {
      color: 'gray',
    },
  });

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        value={value}
        placeholder={placeholder || { label: 'Selecione uma opção...', value: '' }}
        style={{
          inputAndroid: commonStyles.inputContainer,
          inputIOS: commonStyles.inputContainer,
          placeholder: commonStyles.placeholder,
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%', // Preencher o espaço disponível
  },
});

export default SelectPicker;
