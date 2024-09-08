import React, { useState } from 'react';
import { View, Platform, Button } from 'react-native';
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
    <View>
      <Button
        onPress={() => setShow(true)}
        title={formattedDate}
        color="black" 
        
        />
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

export default DatePickerAndroid;
