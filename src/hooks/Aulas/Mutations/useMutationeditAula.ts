import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '~/config';


// Tipo dos dados da aula
interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  tipo: string;
  video: string;
}

// Função para deletar uma aula
const deleteAula = async (id: number) => {
  await axios.delete(`${API_BASE_URL}Aulas/del/${id}`);
};

// Função para editar uma aula
const editAula = async (aula: Aula) => {
  await axios.put(`${API_BASE_URL}Aulas/edit/${aula.id}`, aula);
};

// Hook para deletar uma aula
export const useDeleteAula = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAula,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aulas'] }); // Atualizado para novo formato
    },
  });
};

// Hook para editar uma aula
export const useEditAula = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editAula,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aulas'] }); // Atualizado para novo formato
    },
  });
};
