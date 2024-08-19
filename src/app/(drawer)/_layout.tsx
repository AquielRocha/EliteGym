import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout: React.FC = () => (
  <Drawer
    screenOptions={{
      drawerActiveTintColor: '#4CAF50',
      drawerInactiveTintColor: '#555',
      headerStyle: { backgroundColor: '#f8f8f8' },
      headerTintColor: '#000',
    }}
  >
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <MaterialIcons name="fitness-center" size={24} color="black" />
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
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text style={styles.headerTitleText}>Opções</Text>
          </View>
        ),
        drawerLabel: 'Opções',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/info/opcoes" asChild>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(aparelhos)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <MaterialIcons name="fitness-center" size={24} color="black" />
            <Text style={styles.headerTitleText}>Aparelhos</Text>
          </View>
        ),
        drawerLabel: 'Aparelhos',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="fitness-center" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/info/aparelhos" asChild>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(aula)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <MaterialIcons name="event-note" size={24} color="black" />
            <Text style={styles.headerTitleText}>Aulas</Text>
          </View>
        ),
        drawerLabel: 'Aulas',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="event-note" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/info/aulas" asChild>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(usuarios)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text style={styles.headerTitleText}>Usuários</Text>
          </View>
        ),
        drawerLabel: 'Usuários',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="people-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/info/usuarios" asChild>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(alunos)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Ionicons name="school-outline" size={24} color="black" />
            <Text style={styles.headerTitleText}>Alunos</Text>
          </View>
        ),
        drawerLabel: 'Alunos',
        drawerIcon: ({ size, color }) => (
          <Ionicons name="school-outline" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/info/alunos" asChild>
            <Ionicons name="information-circle-outline" size={24} color="black" />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="(financeiro)"
      options={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text style={styles.headerTitleText}>Financeiro</Text>
          </View>
        ),
        drawerLabel: 'Financeiro',
        drawerIcon: ({ size, color }) => (
          <MaterialIcons name="attach-money" size={size} color={color} />
        ),
        headerRight: () => (
          <Link href="/info/financeiro" asChild>
            <Ionicons name="information-circle-outline" size={24} color="black" />
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
