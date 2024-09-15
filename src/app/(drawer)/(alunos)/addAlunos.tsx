import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Platform, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, Switch, XStack, YStack } from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationAddAluno } from '~/src/hooks/Alunos/Mutations/useMutationAddAluno';
import FormField from '~/components/FormField';
import SelectPicker from '~/components/SelectPicker';
import DatePickerAndroid from '~/components/DatePickerAndroid';
import DatePickerIOS from '~/components/DatePickerIos';
import { useNavigation } from '@react-navigation/native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { alunoSchema, AlunoFormData } from '~/src/Interfaces/AlunoSchema';

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
      const filledFields = Object.values(data).filter(
        (value) => value !== '' && value !== null && value !== undefined
      ).length;
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
      onError: () => {
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
        <YStack padding="$4" space="$4">
                  {/* Tipo de Usuário */}
                  <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="tipo"
              render={({ field }) => (
                <View style={styles.fieldContainer}>
                  <Label color={'black'}>Tipo de Usuário</Label>
                  <SelectPicker
                    items={[
                      { label: 'Selecione o tipo de usuário', value: '' },
                      { label: 'Aluno', value: 'aluno' },
                      { label: 'Professor', value: 'professor' },
                    ]}
                    placeholder={{}}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
              )}
            />
          </View>
          {/* Nome */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="nome"
              render={({ field }) => (
                <FormField
                  label="Nome Completo"
                  value={field.value}
                  onChangeText={field.onChange}
                  containerStyle={styles.fieldContainer}
                />
              )}
            />
          </View>

          {/* Email */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormField
                  label="E-mail"
                  value={field.value}
                  onChangeText={field.onChange}
                  containerStyle={styles.fieldContainer}
                />
              )}
            />
          </View>

          {/* Telefone */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="telefone"
              render={({ field }) => (
                <FormField
                  label="Celular/WhatsApp"
                  value={field.value}
                  onChangeText={field.onChange}
                  maskType="cel-phone"
                  customTextInputProps={{ placeholder: '(99) 99999-9999' }}
                  containerStyle={styles.fieldContainer}
                />
              )}
            />
          </View>

          {/* Data de Nascimento */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="dataNascimento"
              render={({ field }) => (
                <View style={styles.fieldContainer}>
                  <Label color="black">Data de Nascimento</Label>
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
          </View>

          {/* Foto (URL) */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="foto"
              render={({ field }) => (
                <FormField
                  label="Foto (URL)"
                  value={field.value}
                  onChangeText={field.onChange}
                  containerStyle={styles.fieldContainer}
                />
              )}
            />
          </View>

  

          {/* Objetivos */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="objetivos"
              render={({ field }) => (
                <FormField
                  label="Objetivos do Aluno"
                  value={field.value}
                  onChangeText={field.onChange}
                  containerStyle={styles.fieldContainer}
                />
              )}
            />
          </View>

          {/* Preferências de Treino */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="preferenciasTreino"
              render={({ field }) => (
                <View style={styles.fieldContainer}>
                  <Label color={'black'}>Preferências de Treino</Label>
                  <SelectPicker
                    items={[
                      { label: 'Selecione a preferência de treino', value: '' },
                      { label: 'Hipertrofia', value: 'hipertrofia' },
                      { label: 'Emagrecimento', value: 'emagrecimento' },
                      { label: 'Resistência', value: 'resistencia' },
                    ]}
                    placeholder={{}}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
              )}
            />
          </View>

          {/* Tipo de Plano */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="tipoPlano"
              render={({ field }) => (
                <View style={styles.fieldContainer}>
                  <Label color={'black'}>Tipo de Plano</Label>
                  <SelectPicker
                    items={[
                      { label: 'Selecione o tipo de plano', value: '' },
                      { label: 'Plano Mensal', value: 'mensal' },
                      { label: 'Plano Trimestral', value: 'trimestral' },
                      { label: 'Plano Anual', value: 'anual' },
                    ]}
                    placeholder={{}}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
              )}
            />
          </View>

          {/* Status do Pagamento */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="statusPagamento"
              render={({ field }) => (
                <View style={styles.fieldContainer}>
                  <Label color={'black'}>Status do Pagamento</Label>
                  <SelectPicker
                    items={[
                      { label: 'Selecione o status de pagamento', value: '' },
                      { label: 'Pago', value: 'pago' },
                      { label: 'Pendente', value: 'pendente' },
                    ]}
                    placeholder={{}}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
              )}
            />
          </View>

          {/* Informações Médicas */}
          <View style={styles.selectColumn}>
            <Controller
              control={control}
              name="informacoesMedicas"
              render={({ field }) => (
                <FormField
                  label="Informações Médicas"
                  value={field.value}
                  onChangeText={field.onChange}
                  containerStyle={styles.fieldContainer}
                />
              )}
            />
          </View>

                  {/* Ativo */}
                  <View style={styles.selectColumn}>
            {/* <Controller
              control={control}
              name="ativo"
              render={({ field }) => (
                <View style={styles.fieldContainer}>
                  <Label width={100} color={'black'}>
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
                </View>
              )}
            /> */}
          </View>

          {/* Botões de Submit e Voltar */}
          <XStack space="$4" justifyContent="center">
            <Button onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
              Submit
            </Button>
            <Button onPress={() => navigation.goBack()} color="gray" style={styles.backButton}>
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
    backgroundColor: '#cacaca', // Adicionado para uma cor de fundo clara
  },
  progressWheelOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16, 
  },
  selectColumn: {
    marginHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#191970', 
    padding: 10,
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: 'red', // Cinza para o botão de voltar
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default AddAlunoForm;
