import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const API_BASE_URL = 'http://10.0.2.2:5288/api/'; 


const fetchAulas = async () => {
  const response = await axios.get(`${API_BASE_URL}Aulas/getAll`);
  console.log('Dados retornados pela API:', response.data); // Adicione um log para verificar os dados
  return response.data;
};

export const useQueryGetAll = () => {
  return useQuery({
    queryKey: ['aulas'], 
    queryFn: fetchAulas,
  });
};
