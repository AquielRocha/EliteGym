import { z } from 'zod';

const aparelhoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  foto: z.string().min(1, 'Foto é obrigatória'),
  manutencao: z.boolean().optional(),
  categoria: z.enum(['braços', 'pernas', 'costas', 'outros']),
});

export default aparelhoSchema;
