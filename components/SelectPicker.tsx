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
  const androidStyles = StyleSheet.create({
    inputAndroid: {
      height: 40,
      width: 300,
      borderColor: '#B0C4DE',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#fff',
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
        style={
          Platform.OS === 'android'
            ? {
                inputAndroid: androidStyles.inputAndroid,
                placeholder: androidStyles.placeholder,
              }
            : undefined
        }
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default SelectPicker;
