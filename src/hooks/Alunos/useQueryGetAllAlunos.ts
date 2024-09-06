import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const API_BASE_URL = 'http://10.0.2.2:5288/api/'; 

// types.ts (ou diretamente no seu arquivo de componente)
export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  foto?: string;
  tipo: string;
  dataNascimento: string; // ou Date se preferir
  telefone: string;
  objetivos: string;
  tipoPlano: string;
  statusPagamento: string;
  informacoesMedicas?: string;
  preferenciasTreino: string;
  aulas: number;
  ativo: boolean;
  enderecosJoin: Endereco[];
}



const fetchAlunos = async () => {
  const response = await axios.get(`${API_BASE_URL}Alunos/getAll`);
  // console.log('Dados retornados pela API:', response.data); // Adicione um log para verificar os dados
  return response.data;
};

export const useQueryGetAllAlunos = () => {
  return useQuery({
    queryKey: ['alunos'], 
    queryFn: fetchAlunos,
  });
};
