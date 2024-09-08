import React, { useState } from 'react';
import { View, Platform, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerIOSProps {
  value: Date;
  onChange: (event: any, selectedDate?: Date) => void;
}

const DatePickerIOS: React.FC<DatePickerIOSProps> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const onChangeHandler = (event: any, selectedDate?: Date) => {
    setShow(false); // Fecha o picker
    if (selectedDate) {
      onChange(event, selectedDate);
    }
  };

  const formattedDate = value.toLocaleDateString();

  return (
    <View>
      <Button
        onPress={() => setShow(true)}
        title={formattedDate}
        color="black" // Cor padrão definida como preto
      />
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          onChange={onChangeHandler}
        />
      )}
    </View>
  );
};

export default DatePickerIOS;
