import React from 'react';
import { View } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';

const FormField = ({
  label,
  value,
  onChangeText,
  containerStyle = {},
  labelStyle = {},
  maskType = null, // Valor padrão para maskType
  ...props
}) => {
  return (
    <View style={containerStyle}>
      {maskType ? (
        <TextInputMask
          type={maskType}
          value={value}
          onChangeText={onChangeText}
          customTextInput={FloatingLabelInput}
          customTextInputProps={{
            label,
            containerStyles: {
              borderBottomWidth: 1,
              borderColor: '#000',
              paddingVertical: 12,
              backgroundColor: 'white',
              borderRadius: 10,
            },
            customLabelStyles: {
              colorFocused: '#000',
              colorBlurred: '#aaa',
              fontSizeFocused: 14,
              fontSizeBlurred: 16,
            },
            ...props,
          }}
        />
      ) : (
        <FloatingLabelInput
          label={label}
          value={value}
          onChangeText={onChangeText}
          containerStyles={{
            borderBottomWidth: 1,
            borderColor: '#000',
            paddingVertical: 12,
            backgroundColor: 'white',
            borderRadius: 10,
            ...containerStyle,
          }}
          customLabelStyles={{
            colorFocused: '#000',
            colorBlurred: '#aaa',
            fontSizeFocused: 14,
            fontSizeBlurred: 16,
            ...labelStyle,
          }}
          {...props}
        />
      )}
    </View>
  );
};

export default FormField;
