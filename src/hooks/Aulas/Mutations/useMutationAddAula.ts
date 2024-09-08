import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '~/config';


interface Aula {
  nome: string;
  descricao: string;
  foto: string;
  video: string;
  tipo: string;
}

export const useMutationAddAulas = () => {
  return useMutation({
    mutationFn: async (newAula: Aula) => {
      return await axios.post(`${API_BASE_URL}Aulas/add`, newAula);
    },
  });
};
