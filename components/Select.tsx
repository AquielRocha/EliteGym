import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { YStack, Text } from 'tamagui';

interface SelectProps {
  value: boolean | undefined;
  onValueChange: (value: boolean) => void;
}

const MaintenanceSelect: React.FC<SelectProps> = ({ value, onValueChange }) => {
  return (
    <YStack>
      <Text>Manutenção</Text>
      <RNPickerSelect
        value={value !== undefined ? (value ? 'true' : 'false') : 'false'}
        onValueChange={(selectedValue) => onValueChange(selectedValue === 'true')}
        items={[
          { label: 'Sim', value: 'true' },
          { label: 'Não', value: 'false' },
        ]}
        placeholder={{ label: "Selecione manutenção", value: null }}
      />
    </YStack>
  );
};

export default MaintenanceSelect;
