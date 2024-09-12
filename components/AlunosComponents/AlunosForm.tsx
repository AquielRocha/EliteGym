// import React from 'react';
// import { View, ScrollView, Alert } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { Button, Input, Label, Switch, XStack, YStack } from 'tamagui';
// import { useMutationAddAluno } from '~/src/hooks/Alunos/Mutations/useMutationAddAluno';
// import {FloatingLabelInput} from 'react-native-floating-label-input';

// interface Endereco {
//   rua: string;
//   numero: string;
//   complemento: string;
//   bairro: string;
//   cidade: string;
//   estado: string;
//   codigoPostal: string;
//   pais: string;
// }

// interface AlunoFormData {
//   nome: string;
//   email: string;
//   foto: string;
//   tipo: string;
//   dataNascimento: string;
//   telefone: string;
//   objetivos: string;
//   tipoPlano: string;
//   statusPagamento: string;
//   informacoesMedicas: string;
//   preferenciasTreino: string;
//   ativo: boolean;
//   enderecos?: Endereco[];
// }

// const AddAlunoForm = () => {
//   const { control, handleSubmit, reset } = useForm<AlunoFormData>({
//     defaultValues: {
//       nome: '',
//       email: '',
//       foto: '',
//       tipo: '',
//       dataNascimento: '',
//       telefone: '',
//       objetivos: '',
//       tipoPlano: '',
//       statusPagamento: '',
//       informacoesMedicas: '',
//       preferenciasTreino: '',
//       ativo: true,
//       enderecos: [],
//     },
//   });

//   const { mutate } = useMutationAddAluno();

//   const onSubmit = (data: AlunoFormData) => {
//     //@ts-ignore
//     mutate(data, {
//       onSuccess: () => {
//         Alert.alert('Success', 'Aluno added successfully');
//         reset(); // Limpa o formulário após o sucesso
//       },
//       onError: (error) => {
//         Alert.alert('Error', 'Failed to add aluno');
//       },
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <YStack padding="$2" minWidth={300} space="$3">
//         <Controller
//           control={control}
//           name="nome"
//           render={({ field }) => (
//             <FloatingLabelInput
//               label="Nome"
//               value={field.value}
//               onChangeText={field.onChange}
//               containerStyles={{
//                 borderBottomWidth: 1,
//                 borderColor: '#000',
//                 paddingVertical: 10,
//               }}
//               customLabelStyles={{
//                 colorFocused: '#000',
//                 colorBlurred: '#aaa',
//                 fontSizeFocused: 12,
//                 fontSizeBlurred: 16,
//               }}
//             />
//           )}
//         />

//           <Controller
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Email
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Email"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="tipo"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Tipo
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Tipo"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="dataNascimento"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Data Nascimento
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Data Nascimento"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="telefone"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Telefone
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Telefone"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="objetivos"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Objetivos
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Objetivos"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="tipoPlano"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Tipo Plano
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Tipo Plano"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="statusPagamento"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Status Pagamento
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Status Pagamento"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="informacoesMedicas"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Informações Médicas
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Informações Médicas"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="preferenciasTreino"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Preferências Treino
//                 </Label>
//                 <Input
//                   flex={1}
//                   value={field.value}
//                   color={'black'}
//                   backgroundColor={'white'}
//                   onChangeText={field.onChange}
//                   placeholder="Preferências Treino"
//                 />
//               </XStack>
//             )}
//           />

//           <Controller
//             control={control}
//             name="ativo"
//             render={({ field }) => (
//               <XStack alignItems="center" space="$1">
//                 <Label width={50} color={'black'}>
//                   Ativo
//                 </Label>
//                 <Switch
//                   checked={field.value}
//                   //@ts-ignore
//                   onChange={() => field.onChange(!field.value)}
//                   size="$3"
//                   color="$primary"
//                   borderWidth={2}
//                   borderColor="$border"
//                   backgroundColor={field.value ? '$success' : '$error'}
//                   thumbColor={field.value ? '$successDark' : '$errorDark'}
//                 />
//               </XStack>
//             )}
//           />

//           <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
//         </YStack>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = {
//   container: {
//     padding: 8,
//    },
// };

// export default AddAlunoForm;
