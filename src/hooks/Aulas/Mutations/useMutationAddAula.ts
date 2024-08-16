import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'http://10.0.2.2:5288/api/'; 

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
      await axios.post(`${API_BASE_URL}Aulas/add`, newAula);
    },
    onSuccess: () => {
      alert('Aula adicionada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar aula:', error);
      alert('Erro ao adicionar aula.');
    },
  });
};
