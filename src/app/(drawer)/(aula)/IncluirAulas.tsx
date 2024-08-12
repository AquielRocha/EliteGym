import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { YStack, Input, Button, Text, Spacer } from 'tamagui';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Constants from 'expo-constants';

const API_BASE_URL = 'http://10.0.2.2:5288/api/'; // Ajuste conforme necessárisasdsdsado

const IncluirAulas = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [video, setVideo] = useState('');
  const [tipo, setTipo] = useState('');

  const mutation = useMutation({
    mutationFn: async (newAula: { nome: string; descricao: string; foto: string; video: string; tipo: string }) => {
      await axios.post(`${API_BASE_URL}Aulas/add`, newAula);
    },
    onSuccess: () => {
      alert('Aula adicionada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar aula:', error);
      alert('Erro ao adicionar aula.');
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      nome,
      descricao,
      foto,
      video,
      tipo,
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Incluir Aulas' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(aula)/IncluirAulas.tsx" title="Incluir Aulas">
          <YStack padding="$4" space="$4">
            <YStack>
              <Text fontSize="$2" marginBottom="$2">Nome</Text>
              <Input
                placeholder="Nome da Aulaa"
                value={nome}
                onChangeText={setNome}
              />
            </YStack>
            <YStack>
              <Text fontSize="$2" marginBottom="$2">Descrição</Text>
              <Input
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
              />
            </YStack>
            <YStack>
              <Text fontSize="$2" marginBottom="$2">Foto</Text>
              <Input
                placeholder="Foto"
                value={foto}
                onChangeText={setFoto}
              />
            </YStack>
            <YStack>
              <Text fontSize="$2" marginBottom="$2">Vídeo</Text>
              <Input
                placeholder="Vídeo"
                value={video}
                onChangeText={setVideo}
              />
            </YStack>
            <YStack>
              <Text fontSize="$2" marginBottom="$2">Tipo</Text>
              <Input
                placeholder="Tipo"
                value={tipo}
                onChangeText={setTipo}
              />
            </YStack>
            <Spacer />

            <Button onPress={handleSubmit} loading={mutation.isLoading}>
              Adicionar Aula
            </Button>
            {mutation.isError && (
              <Text color="red">Erro ao adicionar aula.</Text>
            )}
          </YStack>
        </ScreenContent>
      </Container>
    </>
  );
};

export default IncluirAulas;
