import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'http://10.0.2.2:5288/api/';

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
      return await axios.post(`${API_BASE_URL}Alunos/add`, novoAluno);
    },
  });
};
