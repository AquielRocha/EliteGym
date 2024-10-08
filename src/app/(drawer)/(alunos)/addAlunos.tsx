import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Platform, StyleSheet, Image as RNImage,ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Label, Switch, XStack, YStack, Text} from 'tamagui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutationAddAluno } from '~/src/hooks/Alunos/Mutations/useMutationAddAluno';
import FormField from '~/components/FormField';
import SelectPicker from '~/components/SelectPicker';
import DatePickerAndroid from '~/components/DatePickerAndroid';
import DatePickerIOS from '~/components/DatePickerIos';
import { useNavigation } from '@react-navigation/native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { alunoSchema, AlunoFormData } from '~/src/Interfaces/AlunoSchema';
import * as ImagePicker from 'expo-image-picker';
import { readAsStringAsync } from 'expo-file-system';
import { useQueryGetPlano } from '~/src/hooks/Alunos/useQueryGetPlano';

const AddAlunoForm = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fotoBase64, setFotoBase64] = useState('');
  const [enderecos, setEnderecos] = useState([{ rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', codigoPostal: '', pais: '' }]);

  const { control, handleSubmit, watch, reset, setValue } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: '',
      email: '',
      foto: '',
      tipo: '', //tipo de Usuário
      dataNascimento: '',
      telefone: '',
      objetivos: '',
      ativo: true,
      enderecos: [],
      planos: [],
    },
  });

  const adicionarEndereco = () => {
    setEnderecos([...enderecos, { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', codigoPostal: '', pais: '' }]);
  };

  const PlanoSelect = () => {
    const { data: planos, isLoading: isLoadingPlanos } = useQueryGetPlano();
    return (
      <Controller
        control={control}
        name="planos"
        render={({ field }) => (
          <View style={styles.fieldContainer}>
            <Label color={'black'}>Selecione o Plano</Label>
            {isLoadingPlanos ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <SelectPicker
                items={[
                  { label: 'Selecione um plano', value: '' },
                  ...(planos?.map((plano) => ({
                    label: `${plano.nome} - R$${plano.valor}`,
                    value: plano.id,
                  })) || []),
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          </View>
        )}
      />
    );
  };


    // Função para remover um endereço
    const removerEndereco = (index: number) => {
      setEnderecos(enderecos.filter((_, i) => i !== index));
    };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      try {
        const base64 = await readAsStringAsync(uri, { encoding: 'base64' });
        const imageBase64 = `data:image/jpeg;base64,${base64}`;
        setFotoBase64(imageBase64);

        // Confirmar a imagem com o usuário
        Alert.alert('Confirmar Imagem', 'Você gostaria de usar esta imagem?', [
          {
            text: 'Cancelar',
            onPress: () => {
              setFotoBase64(''); // Limpar se o usuário cancelar
            },
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              console.log('Imagem confirmada!');
              // Não fazer nada aqui, o estado já foi definido acima
            },
          },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Falha ao converter a imagem para Base64.');
      }
    } else {
      Alert.alert('Cancelado', 'Você cancelou a seleção da imagem.');
    }
  };
  useEffect(() => {
    const subscription = watch((data) => {
      let totalFields = 9; // Total de campos que estamos considerando
      let filledFields = 0;
  
      // Verificar cada campo e contar se está preenchido
      if (data.nome) filledFields++;
      if (data.email) filledFields++;
      if (data.telefone) filledFields++;
      if (data.dataNascimento) filledFields++;
      if (data.objetivos) filledFields++;
      if (data.tipo) filledFields++;
      if (data.planos && data.planos.length > 0) filledFields++;  // Considerar plano selecionado
      if (fotoBase64) filledFields++; // Contar a imagem como preenchida
  
      // Verificar se ao menos um endereço está preenchido
      if (enderecos.some(endereco => endereco.rua || endereco.numero || endereco.bairro || endereco.cidade || endereco.estado)) {
        filledFields++;
      }
  
      // Atualizar o progresso com base no número de campos preenchidos
      setProgress((filledFields / totalFields) * 100);
    });
  
    return () => subscription.unsubscribe();
  }, [watch, enderecos, fotoBase64]);
  
  const { mutate } = useMutationAddAluno();

  const onSubmit = async (data: AlunoFormData) => {
    setLoading(true); // Iniciar o estado de carregamento
  
    const formattedData = {
      ...data,
      foto: fotoBase64,
      dataNascimento: new Date(data.dataNascimento).toISOString(),
    };
  
    try {
      // Simulação de submissão (aqui você pode usar seu serviço de API real)
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simular requisição com 2s
      console.log(data);
      
      // Submeter os dados formatados via mutate
      //@ts-ignore
      mutate(formattedData, {
        onSuccess: () => {
          Alert.alert('Success', 'Aluno adicionado com sucesso!');
          reset(); 
          setFotoBase64(''); 
          navigation.goBack(); 
        },
        onError: (error) => {
          console.error('Erro ao adicionar aluno:', error); 
          Alert.alert('Error', 'Falha ao adicionar o aluno');
        },
      });
    } catch (error) {
      console.log('Erro ao enviar dados', error);
      Alert.alert('Error', 'Falha ao enviar os dados.');
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <View style={styles.screenContainer}>
      <View style={styles.progressWheelOverlay}>
        <AnimatedProgressWheel
          size={100}
          width={20}
          color={'#ADD8E6'}
          progress={progress}
          backgroundColor={'#191970'}
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
                      { label: 'Aluno', value: 'Aluno' },
                      { label: 'Professor', value: 'Professor' },
                    ]}
                    //@ts-ignore
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
                  //@ts-ignore
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
          <Button onPress={selectImage} style={styles.imageButton}>
            <Label color="white">Selecionar Foto</Label>
          </Button>

          {/* Exibe a imagem selecionada, se houver */}
          {fotoBase64 ? (
            <View style={styles.imagePreviewContainer}>
              <RNImage source={{ uri: fotoBase64 }} style={styles.imagePreview} />
            </View>
          ) : null}

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

          
  {/* Plano */}
  <PlanoSelect />
        

  
  

          <XStack space="$4" justifyContent="center">
          <Button onPress={handleSubmit(onSubmit)} style={styles.submitButton} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Spinner enquanto carrega
        ) : (
          <Text color={"white"}>Enviar</Text> // Texto do botão quando não está carregando
        )}
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
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  imageButton: {
    backgroundColor: '#483D8B', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreviewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default AddAlunoForm;
