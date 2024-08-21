import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'http://10.0.2.2:5288/api/'; 

interface Aparelho {
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  manutencao: string;
}

export const useMutationAddAparelhos = () => {
  return useMutation({
    mutationFn: async (newAparelho: Aparelho) => {
      return await axios.post(`${API_BASE_URL}Aparelhos/add`, newAparelho);
    },
  });
};

