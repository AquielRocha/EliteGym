import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout: React.FC = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="dumbbell" size={24} color="black" />
            <Text style={styles.headerTitleText}>EliteGym</Text>
          </View>
        ),
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerTitle: 'EliteGym',
        drawerLabel: 'Opções',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="border-bottom" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
  </Drawer>
);

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DrawerLayout;
