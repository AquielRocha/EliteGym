import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styled, YStack } from 'tamagui';

const TabButton = ({ icon, value, label, actualFormTab, onPress }) => {
  const isSelected = actualFormTab === value;

  return (
    <TouchableOpacity onPress={() => onPress(value)}>
      <YStack
        alignItems="center"
        justifyContent="center"
        paddingBottom="$2"
        borderBottomWidth={isSelected ? 2 : 0}
        borderColor={isSelected ? "$blue10" : "transparent"}
      >
        <Text style={{ fontSize: 24 }}>{icon}</Text>
        <Text style={{ color: isSelected ? "#0066FF" : "#777" }}>{label}</Text>
      </YStack>
    </TouchableOpacity>
  );
};

export default TabButton;
