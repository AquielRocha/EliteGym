import React, { useState } from 'react';
import { View, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerAndroidProps {
  value: Date;
  onChange: (event: any, selectedDate?: Date) => void;
}

const DatePickerAndroid: React.FC<DatePickerAndroidProps> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const onChangeHandler = (event: any, date?: Date) => {
    setShow(Platform.OS === 'ios');
    if (date) {
      onChange(event, date);
    }
  };

  const formattedDate = value.toLocaleDateString();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{formattedDate}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={onChangeHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 150, // Ajuste a largura conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Cor de fundo
    borderRadius: 5, // Cantos arredondados
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DatePickerAndroid;
