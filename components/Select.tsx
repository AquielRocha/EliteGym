import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { YStack, Text } from 'tamagui';

interface MaintenanceSelectProps {
  value: boolean; // Recebe um valor booleano
  onValueChange: (value: boolean) => void; // Recebe um valor booleano
}

const MaintenanceSelect: React.FC<MaintenanceSelectProps> = ({ value, onValueChange }) => {
  return (
    <YStack>
      <Text>Manutenção</Text>
      <RNPickerSelect
        value={value ? 'true' : 'false'} // Converte booleano para string
        onValueChange={(selectedValue) => onValueChange(selectedValue === 'true')} // Converte string para booleano
        items={[
          { label: 'Sim', value: 'true' },
          { label: 'Não', value: 'false' },
        ]}
        placeholder={{ label: 'Selecione manutenção', value: null }}
      />
    </YStack>
  );
};

export default MaintenanceSelect;
