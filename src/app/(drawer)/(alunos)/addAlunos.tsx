import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, Switch, XStack, YStack } from 'tamagui';
import { useMutationAddAluno } from '~/src/hooks/Alunos/Mutations/useMutationAddAluno';
import FormField from '~/components/FormField';

interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

interface AlunoFormData {
  nome: string;
  email: string;
  foto: string;
  tipo: string;
  dataNascimento: string;
  telefone: string;
  objetivos: string;
  tipoPlano: string;
  statusPagamento: string;
  informacoesMedicas: string;
  preferenciasTreino: string;
  ativo: boolean;
  enderecos?: Endereco[];
}

const AddAlunoForm = () => {
  const { control, handleSubmit, reset } = useForm<AlunoFormData>({
    defaultValues: {
      nome: '',
      email: '',
      foto: '',
      tipo: '',
      dataNascimento: '',
      telefone: '',
      objetivos: '',
      tipoPlano: '',
      statusPagamento: '',
      informacoesMedicas: '',
      preferenciasTreino: '',
      ativo: true,
      enderecos: [],
    },
  });

  const { mutate } = useMutationAddAluno();

  const onSubmit = (data: AlunoFormData) => {
    mutate(data, {
      onSuccess: () => {
        Alert.alert('Success', 'Aluno added successfully');
        reset(); // Limpa o formulário após o sucesso
      },
      onError: (error) => {
        Alert.alert('Error', 'Failed to add aluno');
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <YStack padding="$2" minWidth={300} space="$3">
          <Controller
            control={control}
            name="nome"
            render={({ field }) => (
              <FormField
                label="Nome"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormField
                label="Email"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="tipo"
            render={({ field }) => (
              <FormField
                label="Tipo"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="dataNascimento"
            render={({ field }) => (
              <FormField
                label="Data Nascimento"
                value={field.value}
                onChangeText={field.onChange}
                maskType="datetime"
                customTextInputProps={{ placeholder: 'DD/MM/YYYY' }}
              />
            )}
          />

          <Controller
            control={control}
            name="telefone"
            render={({ field }) => (
              <FormField
                label="Telefone"
                value={field.value}
                onChangeText={field.onChange}
                maskType="cel-phone"
                customTextInputProps={{ placeholder: '(99) 99999-9999' }}
              />
            )}
          />

          <Controller
            control={control}
            name="objetivos"
            render={({ field }) => (
              <FormField
                label="Objetivos"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="tipoPlano"
            render={({ field }) => (
              <FormField
                label="Tipo Plano"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="statusPagamento"
            render={({ field }) => (
              <FormField
                label="Status Pagamento"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="informacoesMedicas"
            render={({ field }) => (
              <FormField
                label="Informações Médicas"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="preferenciasTreino"
            render={({ field }) => (
              <FormField
                label="Preferências Treino"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="ativo"
            render={({ field }) => (
              <XStack alignItems="center" space="$1">
                <Label width={50} color={'black'}>
                  Ativo
                </Label>
                <Switch
                  checked={field.value}
                  onChange={() => field.onChange(!field.value)}
                  size="$3"
                  color="$primary"
                  borderWidth={2}
                  borderColor="$border"
                  backgroundColor={field.value ? '$success' : '$error'}
                  thumbColor={field.value ? '$successDark' : '$errorDark'}
                />
              </XStack>
            )}
          />

          <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        </YStack>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 5,
  },
};

export default AddAlunoForm;
