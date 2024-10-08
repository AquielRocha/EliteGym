import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '~/config';



// types.ts (ou diretamente no seu arquivo de componente)
export interface Plano {
    id: number;
 nome: string;
 valor: number;
 descricao: string;
}


const fetchPlanos = async () => {
  const response = await axios.get(`${API_BASE_URL}Planos`);
  // console.log('Dados retornados pela API:', response.data); // Adicione um log para verificar os dados
  return response.data;
};

export const useQueryGetPlano = () => {
  return useQuery({
    queryKey: ['planos'], 
    queryFn: fetchPlanos,
  });
};
