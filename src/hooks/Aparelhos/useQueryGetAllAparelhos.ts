
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://10.0.2.2:5288/api/';

const fetchAparelhos = async () => {
    const response = await axios.get(`${API_BASE_URL}Aparelhos/getAll`);
    console.log('Dados retornados pela API:', response.data);
    return response.data;
};

export const useQueryGetAllAparelhos = () => {
  return useQuery({
    queryKey: ['aparelhos'], 
    queryFn: fetchAparelhos,
  });
};
