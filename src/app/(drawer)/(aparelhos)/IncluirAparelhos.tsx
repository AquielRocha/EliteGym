import React from 'react';
import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { YStack, Input, Button, Text, Spacer } from 'tamagui';
import { Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import aparelhoSchema from '~/src/Interfaces/ZodSchemaAparelhos';
import { useMutationAddAparelhos } from '~/src/hooks/Aparelhos/Mutations/useMutationAddAparelho';
import MaintenanceSelect from '~/components/Select';
import CustomSelect from '~/components/CustomSelect';

// Define the form data type
type FormData = z.infer<typeof aparelhoSchema>;

const IncluirAparelhos = () => {
  const { mutate: addAparelho, isError } = useMutationAddAparelhos();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(aparelhoSchema),
  });

  const onSubmit = (data: FormData) => {
    //@ts-ignore
    addAparelho(data, {
      onSuccess: () => {
        reset();
        Alert.alert('Sucesso', 'Aparelho adicionado com sucesso!');
      },
      onError: () => {
        Alert.alert('Erro', 'Erro ao adicionar aparelho.');
      },
    });
  };

  const categoryItems = [
    { label: 'Braços', value: 'braços' },
    { label: 'Pernas', value: 'pernas' },
    { label: 'Costas', value: 'costas' },
    { label: 'Outros', value: 'outros' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Incluir Aparelhos' }} />
      <Container>
        <YStack padding="$4" space="$4">
          <YStack>
            <Text fontSize="$2" marginBottom="$2">Nome</Text>
            <Controller
              name="nome"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Nome do Aparelho"
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
            <Controller
              name="categoria"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  value={value || ''}
                  onValueChange={onChange}
                  items={categoryItems}
                  placeholder={{ label: 'Selecione a categoria', value: '' }}
                />
              )}
            />
            {errors.categoria && <Text color="red">{errors.categoria.message}</Text>}
          </YStack>
          <YStack>
            <Controller
              name="manutencao"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MaintenanceSelect
                  value={value || false}
                  onValueChange={onChange}
                />
              )}
            />
            {errors.manutencao && <Text color="red">{errors.manutencao.message}</Text>}
          </YStack>
          <Spacer />
          <Button onPress={handleSubmit(onSubmit)}>
            Adicionar Aparelho
          </Button>
          {isError && (
            <Text color="red">Erro ao adicionar aparelho.</Text>
          )}
        </YStack>
      </Container>
    </>
  );
};

export default IncluirAparelhos;
