import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
  labelStyle?: object;
  maskType?: string | null;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  containerStyle = {},
  labelStyle = {},
  maskType = null,
  ...props
}) => {
  const commonStyles = StyleSheet.create({
    container: {
      marginVertical: 12, // Aumenta o espaço entre os campos
      width: '100%',
    },
    inputContainer: {
      borderWidth: 8,
      borderColor: '#ffffff',
      borderRadius: 8, // Borda arredondada
      height: 55, // Ajusta a altura
      shadowColor: '#ffffff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      backgroundColor: '#fff',
    },
    input: {
      height: '100%',
      color: '#000',
      paddingHorizontal: 12, // Aumenta o padding
      paddingVertical: 8, // Aumenta o padding
      fontSize: 16, // Aumenta o tamanho da fonte
    },
    labelFocused: {
      color: '#000000', // Cor do rótulo quando focado
      fontSize: 13, // Tamanho do texto quando focado
    },
    labelBlurred: {
      color: '#000000',
      fontSize: 16, // Tamanho do texto quando desfocado
    },
  });

  return (
    <View style={[commonStyles.container, containerStyle]}>
      {maskType ? (
        <TextInputMask
          type={maskType}
          value={value}
          onChangeText={onChangeText}
          customTextInput={FloatingLabelInput}
          customTextInputProps={{
            label,
            containerStyles: commonStyles.inputContainer,
            customLabelStyles: {
              colorFocused: commonStyles.labelFocused.color,
              colorBlurred: commonStyles.labelBlurred.color,
              fontSizeFocused: commonStyles.labelFocused.fontSize,
              fontSizeBlurred: commonStyles.labelBlurred.fontSize,
              ...labelStyle,
            },
            inputStyles: commonStyles.input,
            ...props,
          }}
        />
      ) : (
        <FloatingLabelInput
          label={label}
          value={value}
          onChangeText={onChangeText}
          containerStyles={commonStyles.inputContainer}
          customLabelStyles={{
            colorFocused: commonStyles.labelFocused.color,
            colorBlurred: commonStyles.labelBlurred.color,
            fontSizeFocused: commonStyles.labelFocused.fontSize,
            fontSizeBlurred: commonStyles.labelBlurred.fontSize,
            ...labelStyle,
          }}
          inputStyles={commonStyles.input}
          {...props}
        />
      )}
    </View>
  );
};

export default FormField;
