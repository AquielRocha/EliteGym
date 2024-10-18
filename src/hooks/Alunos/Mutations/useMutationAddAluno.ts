import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';


export interface NovoAluno {
  nome: string;
  email: string;
  foto?: string; // Foto agora pode ser opcional
  tipo: string;
  dataNascimento: string; // Será enviada como string em formato ISO
  telefone?: string; // Telefone pode ser opcional
  objetivos?: string; // Objetivos podem ser opcionais
  ativo: boolean;
  planoId: number; // Adicionando planoId corretamente
  enderecos?: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    codigoPostal: string;
    pais: string;
  }[];
}

export const useMutationAddAluno = () => {
  return useMutation({
    mutationFn: async (novoAluno: NovoAluno) => {
      try {
        // Log dos dados enviados para a API
        console.log('Enviando aluno para a API:', novoAluno);

        const response = await axios.post(`${API_BASE_URL}Alunos/add`, novoAluno);
        
        // Log da resposta da API
        console.log('Resposta da API:', response.data);

        return response.data;
      } catch (error: any) {
        console.error('Erro na API:', error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Erro ao adicionar aluno');
      }
    },
  });
};
