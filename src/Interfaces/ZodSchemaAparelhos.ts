import { z } from 'zod';

const aparelhoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  foto: z.string().min(1, 'Foto é obrigatória'),
  manutencao: z.boolean().refine(val => typeof val === 'boolean', 'Manutenção deve ser verdadeiro ou falso').optional(),
});

export default aparelhoSchema;