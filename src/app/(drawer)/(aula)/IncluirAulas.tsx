import React from 'react';
import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { YStack, Input, Button, Text, Spacer } from 'tamagui';
import { useMutationAddAulas } from '~/src/hooks/Aulas/Mutations/useMutationAddAula';
import { Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import aulaSchema from '~/src/Interfaces/ZodSchema';

// Define the form data type
type FormData = z.infer<typeof aulaSchema>;

const IncluirAulas = () => {
  const { mutate: addAula, isError } = useMutationAddAulas();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(aulaSchema),
  });

  const onSubmit = (data: FormData) => {
    //@ts-ignore
    addAula(data, {
      onSuccess: () => {
        reset(); // Clear the form fields
        Alert.alert('Sucesso', 'Aula adicionada com sucesso!');
      },
      onError: () => {
        Alert.alert('Erro', 'Erro ao adicionar aula.');
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Incluir Aulas' }} />
      <Container>
        <YStack padding="$4" space="$4">
          <YStack>
            <Text fontSize="$2" marginBottom="$2">Nome</Text>
            <Controller
              name="nome"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome da Aula"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ borderColor: errors.nome ? 'red' : 'black', borderWidth: 1 }}
                />
              )}
            />
            {errors.nome && <Text color="red">{errors.nome.message}</Text>}
          </YStack>
          <YStack>
            <Text fontSize="$2" marginBottom="$2">Descrição</Text>
            <Controller
              name="descricao"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Descrição"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ borderColor: errors.descricao ? 'red' : 'black', borderWidth: 1 }}
                />
              )}
            />
            {errors.descricao && <Text color="red">{errors.descricao.message}</Text>}
          </YStack>
          <YStack>
            <Text fontSize="$2" marginBottom="$2">Foto</Text>
            <Controller
              name="foto"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Foto"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ borderColor: errors.foto ? 'red' : 'black', borderWidth: 1 }}
                />
              )}
            />
            {errors.foto && <Text color="red">{errors.foto.message}</Text>}
          </YStack>
          <YStack>
            <Text fontSize="$2" marginBottom="$2">Vídeo</Text>
            <Controller
              name="video"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Vídeo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ borderColor: errors.video ? 'red' : 'black', borderWidth: 1 }}
                />
              )}
            />
            {errors.video && <Text color="red">{errors.video.message}</Text>}
          </YStack>
          <YStack>
            <Text fontSize="$2" marginBottom="$2">Tipo</Text>
            <Controller
              name="tipo"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Tipo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ borderColor: errors.tipo ? 'red' : 'black', borderWidth: 1 }}
                />
              )}
            />
            {errors.tipo && <Text color="red">{errors.tipo.message}</Text>}
          </YStack>
          <Spacer />

          <Button onPress={handleSubmit(onSubmit)}>
            Adicionar Aula
          </Button>
          {isError && (
            <Text color="red">Erro ao adicionar aula.</Text>
          )}
        </YStack>
      </Container>
    </>
  );
};

export default IncluirAulas;
