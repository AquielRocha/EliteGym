import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { YStack, Input, Button, Text, Spacer } from 'tamagui';
import { useMutationAddAulas } from '~/src/hooks/Aulas/Mutations/useMutationAddAula';

const IncluirAulas = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [video, setVideo] = useState('');
  const [tipo, setTipo] = useState('');

  const mutation = useMutationAddAulas();

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
                placeholder="Nome da Aula"
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
            
            
            <Button onPress={handleSubmit} disabled={mutation.isLoading}>
          //@ts-ignore
{mutation.isLoading ? 'Adicionando...' : 'Adicionar Aula'}
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
