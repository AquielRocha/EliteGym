import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  aula:any;
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
    const newEnderecos = formData.enderecos.filter((_, i) => i !== index);
    setFormData({ ...formData, enderecos: newEnderecos });
  };

  const handleSubmit = () => {
    console.log('handleSubmit foi chamado');
    mutate(formData, {
      onSuccess: () => {
        console.log('Aluno adicionado com sucesso!');
        Alert.alert('Sucesso', 'Aluno adicionado com sucesso!');
      },
      onError: (error) => {
        console.error('Erro ao adicionar aluno:', error);
        Alert.alert('Erro', `Não foi possível adicionar o aluno. Erro: ${error.message}`);
      }
    });
  };
  

  const pickImage = async () => {
    // Solicitar permissões para acessar a galeria de imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos de permissões para acessar suas fotos.');
      return;
    }

    // Selecionar imagem da galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // Converter imagem para base64
      const base64Image = `data:image/jpeg;base64,${await fetch(result.assets[0].uri)
        .then(response => response.blob())
        .then(blob => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }))}`;
      
      setFormData({ ...formData, foto: base64Image });
    }
  };

  

  return (
    <ScrollView style={styles.container}>
      <TextInput 
        placeholder="Nome"
        value={formData.nome}
        onChangeText={(value) => setFormData({ ...formData, nome: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Foto"
        value={formData.foto}
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        style={styles.input}
      />

      <TextInput 
        placeholder="Tipo"
        value={formData.tipo}
        onChangeText={(value) => setFormData({ ...formData, tipo: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Data de Nascimento (YYYY-MM-DD)"
        value={formData.dataNascimento}
        onChangeText={(value) => setFormData({ ...formData, dataNascimento: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Telefone"
        value={formData.telefone}
        onChangeText={(value) => setFormData({ ...formData, telefone: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Objetivos"
        value={formData.objetivos}
        onChangeText={(value) => setFormData({ ...formData, objetivos: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Tipo do Plano"
        value={formData.tipoPlano}
        onChangeText={(value) => setFormData({ ...formData, tipoPlano: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Status do Pagamento"
        value={formData.statusPagamento}
        onChangeText={(value) => setFormData({ ...formData, statusPagamento: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Informações Médicas"
        value={formData.informacoesMedicas}
        onChangeText={(value) => setFormData({ ...formData, informacoesMedicas: value })}
        style={styles.input}
      />
      <TextInput 
        placeholder="Preferências de Treino"
        value={formData.preferenciasTreino}
        onChangeText={(value) => setFormData({ ...formData, preferenciasTreino: value })}
        style={styles.input}
      />

      {formData.enderecos.map((endereco, index) => (
        <View key={index} style={styles.enderecoContainer}>
          <Text>Endereço {index + 1}</Text>
          <TextInput
            placeholder="Rua"
            value={endereco.rua}
            onChangeText={(value) => handleEnderecoChange(index, 'rua', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Número"
            value={endereco.numero}
            onChangeText={(value) => handleEnderecoChange(index, 'numero', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Complemento"
            value={endereco.complemento}
            onChangeText={(value) => handleEnderecoChange(index, 'complemento', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Bairro"
            value={endereco.bairro}
            onChangeText={(value) => handleEnderecoChange(index, 'bairro', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Cidade"
            value={endereco.cidade}
            onChangeText={(value) => handleEnderecoChange(index, 'cidade', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Estado"
            value={endereco.estado}
            onChangeText={(value) => handleEnderecoChange(index, 'estado', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Código Postal"
            value={endereco.codigoPostal}
            onChangeText={(value) => handleEnderecoChange(index, 'codigoPostal', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="País"
            value={endereco.pais}
            onChangeText={(value) => handleEnderecoChange(index, 'pais', value)}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => removeEndereco(index)}
            style={styles.removeButton}
          >
            <Text>Remover Endereço</Text>
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
  imagePickerButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
};

export default AddAlunoForm;
