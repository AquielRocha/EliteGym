import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useMutationAddAluno } from '~/src/hooks/Alunos/Mutations/useMutationAddAluno';
import { Ionicons } from '@expo/vector-icons';

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
  aula: any;
  enderecos: Endereco[];
}

const AddAlunoForm = () => {
  const { mutate } = useMutationAddAluno();
  const [formData, setFormData] = useState<AlunoFormData>({
    nome: '',
    email: '',
    foto: '',
    tipo: '',
    dataNascimento: '',
    telefone: '',
    aula: 1,
    objetivos: '',
    tipoPlano: '',
    statusPagamento: '',
    informacoesMedicas: '',
    preferenciasTreino: '',
    ativo: true,
    enderecos: [{ rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', codigoPostal: '', pais: '' }],
  });

  const handleChange = (field: keyof AlunoFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEnderecoChange = (index: number, field: keyof Endereco, value: string) => {
    const newEnderecos = [...formData.enderecos];
    newEnderecos[index][field] = value;
    setFormData({ ...formData, enderecos: newEnderecos });
  };

  const addEndereco = () => {
    setFormData({
      ...formData,
      enderecos: [...formData.enderecos, { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', codigoPostal: '', pais: '' }],
    });
  };

  const removeEndereco = (index: number) => {
    setFormData({
      ...formData,
      enderecos: formData.enderecos.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    mutate(formData, {
      onSuccess: () => {
        Alert.alert('Sucesso', 'Aluno adicionado com sucesso!');
      },
      onError: (error) => {
        Alert.alert('Erro', `Não foi possível adicionar o aluno. Erro: ${error.message}`);
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <InputField placeholder="Nome" value={formData.nome} onChangeText={(value) => handleChange('nome', value)} />
      <InputField placeholder="Email" value={formData.email} onChangeText={(value) => handleChange('email', value)} />
      <InputField placeholder="Foto" value={formData.foto} onChangeText={(value) => handleChange('foto', value)} />
      <InputField placeholder="Tipo" value={formData.tipo} onChangeText={(value) => handleChange('tipo', value)} />
      <InputField placeholder="Data de Nascimento (YYYY-MM-DD)" value={formData.dataNascimento} onChangeText={(value) => handleChange('dataNascimento', value)} />
      <InputField placeholder="Telefone" value={formData.telefone} onChangeText={(value) => handleChange('telefone', value)} />
      <InputField placeholder="Objetivos" value={formData.objetivos} onChangeText={(value) => handleChange('objetivos', value)} />
      <InputField placeholder="Tipo do Plano" value={formData.tipoPlano} onChangeText={(value) => handleChange('tipoPlano', value)} />
      <InputField placeholder="Status do Pagamento" value={formData.statusPagamento} onChangeText={(value) => handleChange('statusPagamento', value)} />
      <InputField placeholder="Informações Médicas" value={formData.informacoesMedicas} onChangeText={(value) => handleChange('informacoesMedicas', value)} />
      <InputField placeholder="Preferências de Treino" value={formData.preferenciasTreino} onChangeText={(value) => handleChange('preferenciasTreino', value)} />

      {formData.enderecos.map((endereco, index) => (
        <View key={index} style={styles.enderecoContainer}>
          <Text>Endereço {index + 1}</Text>
          {Object.keys(endereco).map((key) => (
            <InputField
              key={key}
              placeholder={capitalizeFirstLetter(key)}
              value={endereco[key as keyof Endereco]}
              onChangeText={(value) => handleEnderecoChange(index, key as keyof Endereco, value)}
            />
          ))}
          <TouchableOpacity onPress={() => removeEndereco(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remover Endereço</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Salvar Aluno" onPress={handleSubmit} />
      <TouchableOpacity onPress={addEndereco} style={styles.addButton}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const InputField = ({ placeholder, value, onChangeText }: { placeholder: string; value: string; onChangeText: (value: string) => void }) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    style={styles.input}
  />
);

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const styles = {
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  enderecoContainer: {
    marginBottom: 20,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 5,
  },
};

export default AddAlunoForm;
