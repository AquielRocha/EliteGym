import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Platform, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, Switch, XStack, YStack } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationAddAluno } from '~/src/hooks/Alunos/Mutations/useMutationAddAluno';
import FormField from '~/components/FormField';
import SelectPicker from '~/components/SelectPicker'; // Adicionei o SelectPicker aqui
import DatePickerAndroid from '~/components/DatePickerAndroid';
import DatePickerIOS from '~/components/DatePickerIos';
import { useNavigation } from '@react-navigation/native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { alunoSchema, AlunoFormData } from '~/src/Interfaces/AlunoSchema';
import { color } from '@tamagui/themes';


const AddAlunoForm = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, watch, reset, setValue } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
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

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const subscription = watch((data) => {
      const totalFields = 13;
      const filledFields = Object.values(data).filter(value => value !== '' && value !== null && value !== undefined).length;
      setProgress((filledFields / totalFields) * 100);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const { mutate } = useMutationAddAluno();

  const onSubmit = (data: AlunoFormData) => {
    const formattedData = {
      ...data,
      dataNascimento: new Date(data.dataNascimento).toISOString(),
    };

    mutate(formattedData, {
      onSuccess: () => {
        Alert.alert('Success', 'Aluno adicionado com sucesso!');
        reset();
        navigation.goBack();
      },
      onError: (error) => {
        Alert.alert('Error', 'Falha ao adicionar o aluno');
      },
    });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.progressWheelOverlay}>
        <AnimatedProgressWheel
          size={100}
          width={20}
          color={'#778899'}
          progress={progress}
          backgroundColor={'black'}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <YStack padding="$2" minWidth={300} space="$3">
          {/* Campos de Texto */}
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
            name="foto"
            render={({ field }) => (
              <FormField
                label="Foto (URL)"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          {/* Campos Select */}
          <Controller
  control={control}
  name="tipo"
  render={({ field }) => (
    <>
      <Label color={'black'}>Tipo de Usuário</Label>
      <SelectPicker
        items={[
          { label: 'Selecione o tipo de usuário', value: '' },  // Placeholder
          { label: 'Aluno', value: 'aluno' },
          { label: 'Professor', value: 'professor' },
        ]}
//@ts-ignore
        placeholder={{}}  // Se o componente requer um placeholder separado, mas em alguns casos só o item já funciona

        value={field.value}
        onValueChange={field.onChange}
      />
    </>
  )}
/>


<Controller
  control={control}
  name="tipoPlano"
  render={({ field }) => (
    <>
      <Label color={'black'}>Tipo de Plano</Label>
      <SelectPicker
        items={[
          { label: 'Selecione o tipo de plano', value: '' },  // Placeholder
          { label: 'Plano Mensal', value: 'mensal' },
          { label: 'Plano Trimestral', value: 'trimestral' },
          { label: 'Plano Anual', value: 'anual' },
        ]}
        //@ts-ignore
        placeholder={{}}  // Se o componente requer um placeholder separado, mas em alguns casos só o item já funciona

                //@ts-ignore
        value={field.value}
        onValueChange={field.onChange}
      />
    </>
  )}
/>

<Controller
  control={control}
  name="statusPagamento"
  render={({ field }) => (
    <>
      <Label color={'black'}>Status do Pagamento</Label>
      <SelectPicker
        items={[
          { label: 'Selecione o status de pagamento', value: '' },  // Placeholder
          { label: 'Pago', value: 'pago' },
          { label: 'Pendente', value: 'pendente' },
        ]}
        //@ts-ignore
        placeholder={{}}  // Se o componente requer um placeholder separado, mas em alguns casos só o item já funciona


        value={field.value}
        onValueChange={field.onChange}
      />
    </>
  )}
/>

<Controller
  control={control}
  name="preferenciasTreino"
  render={({ field }) => (
    <>
      <Label color={'black'}>Preferências de Treino</Label>
      <SelectPicker
        items={[
          { label: 'Selecione a preferência de treino', value: '' },  // Placeholder
          { label: 'Hipertrofia', value: 'hipertrofia' },
          { label: 'Emagrecimento', value: 'emagrecimento' },
          { label: 'Resistência', value: 'resistencia' },
        ]}
        //@ts-ignore
        placeholder={{}}  // Se o componente requer um placeholder separado, mas em alguns casos só o item já funciona


        value={field.value}
        onValueChange={field.onChange}
      />
    </>
  )}
/>


          {/* Outros Campos */}
          <Controller
            control={control}
            name="dataNascimento"
            render={({ field }) => (
              <View>
                <Label color="black">Selecione sua data de nascimento</Label>
                {Platform.OS === 'ios' ? (
                  <DatePickerIOS
                    value={field.value ? new Date(field.value) : new Date()}
                    onChange={(event, selectedDate) => {
                      setValue('dataNascimento', selectedDate?.toISOString() || field.value);
                    }}
                  />
                ) : (
                  <DatePickerAndroid
                    value={field.value ? new Date(field.value) : new Date()}
                    onChange={(event, selectedDate) => {
                      setValue('dataNascimento', selectedDate?.toISOString() || field.value);
                    }}
                  />
                )}
              </View>
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
                //@ts-ignore
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

          <XStack space="$2">
            <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
            <Button onPress={() => navigation.goBack()} color="gray">
              Voltar
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  progressWheelOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10, 
  },
  scrollContainer: {
    padding: 2,
  },
});

export default AddAlunoForm;
