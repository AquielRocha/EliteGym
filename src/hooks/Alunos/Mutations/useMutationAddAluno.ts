import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';


export interface NovoAluno {
    nome: string;
    email: string;
    foto: string; 
    tipo: string;
    dataNascimento: Date;
    telefone: string;
    objetivos: string;
    tipoPlano: string;
    statusPagamento: string;
    informacoesMedicas: string;
    preferenciasTreino: string;
    ativo: boolean;
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
        const response = await axios.post(`${API_BASE_URL}Alunos/add`, novoAluno);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Erro ao adicionar aluno');
      }
    },
    
    
  });
};
