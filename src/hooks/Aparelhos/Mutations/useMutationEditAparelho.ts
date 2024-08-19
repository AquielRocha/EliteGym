import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// URL base da sua API
const API_BASE_URL = 'http://10.0.2.2:5288/api/';

// Tipo dos dados do aparelho
interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  manutencao: boolean;
}

// Função para deletar um aparelho
const deleteAparelho = async (id: number) => {
  await axios.delete(`${API_BASE_URL}Aparelhos/delete/${id}`);
};

// Função para editar um aparelho
const editAparelho = async (aparelho: Aparelho) => {
  await axios.put(`${API_BASE_URL}Aparelhos/update/${aparelho.id}`, aparelho);
};

// Hook para deletar um aparelho
export const useDeleteAparelho = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAparelho,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aparelhos'] });
    },
  });
};

// Hook para editar um aparelho
export const useEditAparelho = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editAparelho,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aparelhos'] });
    },
  });
};
