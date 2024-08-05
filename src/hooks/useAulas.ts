import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// URL base da sua API
const API_BASE_URL = 'http://10.0.2.2:5288/api/'; // Ajuste conforme necessário

// Função para buscar todas as aulas
const fetchAulas = async () => {
  const response = await axios.get(`${API_BASE_URL}Aulas/getAll`);
  console.log('Dados retornados pela API:', response.data); // Adicione um log para verificar os dados
  return response.data;
};

// Hook para buscar todas as aulas
export const useAulas = () => {
  return useQuery({
    queryKey: ['aulas'], 
    queryFn: fetchAulas,
  });
};
