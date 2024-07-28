import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome6, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { HeaderButton } from '~/components/HeaderButton';

const DrawerLayout: React.FC = () => (
  <Drawer>
    <Drawer.Screen
      name="home"
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
      name="(opcoes)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="dumbbell" size={24} color="black" />
            <Text style={styles.headerTitleText}>EliteGym</Text>
          </View>
        ),
        drawerLabel: 'Opções',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(aparelhos)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="dumbbell" size={24} color="black" />
            <Text style={styles.headerTitleText}>EliteGym</Text>
          </View>
        ),
        drawerLabel: 'Aparelhos',
        drawerIcon: ({ size, color }) => (
          <FontAwesome5 name="dumbbell" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(aula)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="dumbbell" size={24} color="black" />
            <Text style={styles.headerTitleText}>EliteGym</Text>
          </View>
        ),
        drawerLabel: 'Aulas',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="event" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(usuarios)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="dumbbell" size={24} color="black" />
            <Text style={styles.headerTitleText}>EliteGym</Text>
          </View>
        ),
        drawerLabel: 'Usuários/Alunos',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="people-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(financeiro)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <FontAwesome6 name="dumbbell" size={24} color="black" />
            <Text style={styles.headerTitleText}>EliteGym</Text>
          </View>
        ),
        drawerLabel: 'Financeiro',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="attach-money" size={size} color={color} />
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
