import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, Text, YStack, Input } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQueryGetAllAlunos } from '~/src/hooks/Alunos/useQueryGetAllAlunos';

export default function Alunos() {
  const { data, error, isLoading, refetch } = useQueryGetAllAlunos();

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Carregando...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Erro ao carregar dados.</Text>
        <Button onPress={() => refetch()}>
          <Ionicons name="reload-outline" size={24} color="white" />
          <Text> Tentar novamente</Text>
        </Button>
      </YStack>
    );
  }

  return (
    <YStack padding="$4" flex={1}>
      <YStack flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text fontSize="$5" fontWeight="bold">
          Alunos caralhoooo
        </Text>
        <Button onPress={() => refetch()}>
          <Ionicons name="reload-outline" size={24} color="white" />
        </Button>
      </YStack>
      <ScrollView>
        {data && data.map((aluno: { id: React.Key | null | undefined; nome: any; email: any; telefone: any; tipo: any; dataNascimento: string | number | Date; }) => (
          <YStack key={aluno.id} padding="$4" borderWidth={1} borderColor="#ddd" marginBottom="$4" borderRadius="$2">
            <Text fontWeight="bold" fontSize="$4">{aluno.nome}</Text>
            <Text>Email: {aluno.email}</Text>
            <Text>Telefone: {aluno.telefone}</Text>
            <Text>Tipo: {aluno.tipo}</Text>
            <Text>Data de Nascimento: {new Date(aluno.dataNascimento).toLocaleDateString()}</Text>
            {/* Renderizar outros detalhes do aluno */}
          </YStack>
        ))}
      </ScrollView>
    </YStack>
  );
}
