import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { YStack, Text } from 'tamagui';

interface CustomSelectProps {
  value: string; // Altere de 'string | null' para 'string'
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder?: { label: string; value: string };
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onValueChange, items, placeholder }) => {
  return (
    <YStack>
      <Text>Categoria</Text>
      <RNPickerSelect
        value={value}
        onValueChange={onValueChange}
        items={items}
        placeholder={placeholder}
      />
    </YStack>
  );
};

export default CustomSelect;
