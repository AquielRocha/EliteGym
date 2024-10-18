import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '~/config';
// types.ts (ou diretamente no seu arquivo de componente)
export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

export interface Mensalidade {
  id: number;
  valorMensalidade: number;
  dataVencimento: string; // ou Date, se preferir
  dataPagamento?: string | null; // Pode ser nulo se não foi pago
  status: string;
  plano?: string | null; // Se o plano estiver presente, pode ser uma string ou null
}

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  fotoBase64: string; // Usando fotoBase64 para a imagem em base64
  tipo: string;
  dataNascimento: string; // ou Date se preferir
  telefone: string;
  dataCadastro: string; // ou Date se preferir
  objetivos: string;
  ativo: boolean;
  enderecos: Endereco[]; // Ajustado para refletir o nome correto
  mensalidades: Mensalidade[]; // Adicionada a interface Mensalidade
}

const fetchAlunos = async () => {
  const response = await axios.get(`${API_BASE_URL}Alunos/getAll`);

  // Log para verificar a estrutura dos dados retornados pela API
  console.log('Dados retornados pela API:', response.data);

  return response.data;
};
export const useQueryGetAllAlunos = () => {
  return useQuery({
    queryKey: ['alunos'],
    queryFn: fetchAlunos,
  });
};
