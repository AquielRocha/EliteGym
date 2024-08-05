import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  size?: number;
}

const Spacer: React.FC<SpacerProps> = ({ size = 8 }) => {
  return <View style={{ height: size, width: size }} />;
};

export default Spacer;
