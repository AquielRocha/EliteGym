import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';

const FormField = ({
  //@ts-ignore
  label,
  //@ts-ignore
  value,
  //@ts-ignore
  onChangeText,
  containerStyle = {},
  labelStyle = {},
  maskType = null, 
  ...props
}) => {
  const commonStyles = StyleSheet.create({
    container: {
      marginVertical: 2,
      alignItems: 'center',
      width: '50%',
    },
    inputContainer: {
      borderWidth: 1,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderColor: '#B0C4DE',
      borderRadius: 8,
    },
    input: {
      color: 'black',
      paddingHorizontal: 10,
      paddingVertical: 15,
    },
    labelFocused: {
      color: '#708090', 
      fontSize: 12,
    },
    labelBlurred: {
      color: '#708090', 
      fontSize: 18,
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