import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YStack } from 'tamagui';

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description}) => {
  return (
    <YStack style={styles.infoCard} space="$2">
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </YStack>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default InfoCard;
