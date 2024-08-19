// src/components/Checkbox.tsx
import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Text, YStack } from 'tamagui';
import { Control, Controller } from 'react-hook-form';

// Define a type for the props
interface CheckboxProps {
  control: Control<any>;
  name: string;
  label: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const Checkbox: React.FC<CheckboxProps> = ({ control, name, label, style, labelStyle }) => {
  return (
    <YStack space="$2" style={style}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack>
            <TouchableOpacity
              style={[styles.checkbox, value && styles.checkboxChecked]}
              onPress={() => onChange(!value)}
              onBlur={onBlur}
            />
            <Text style={labelStyle}>{label}</Text>
          </YStack>
        )}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
});

export default Checkbox;
