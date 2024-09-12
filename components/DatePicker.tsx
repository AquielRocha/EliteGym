import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'tamagui';

interface DatePickerProps {
  value: Date;
  onChange: (event: any, selectedDate?: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  const onChangeHandler = (event: any, date?: Date) => {
    setShow(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      onChange(event, date);
    }
  };

  const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : 'Selecione a Data';

  return (
    <View>
      <Button
        onPress={() => setShow(true)}
        color="black"
        backgroundColor="white"
        size="$4"
        borderRadius="$2"
      >
        {formattedDate}
      </Button>
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

export default DatePicker;
