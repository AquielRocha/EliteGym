import { z } from 'zod';

// Definir o schema do Zod para o formulário de Aluno
export const alunoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  foto: z.string().optional(), // A foto pode ser opcional
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  dataNascimento: z.string().refine(
    (value) => !isNaN(Date.parse(value)), 
    'Data de nascimento inválida'
  ),
  telefone: z.string().min(10, 'Telefone inválido').optional(),
  objetivos: z.string().optional(),
  ativo: z.boolean(),
  planoId: z.number().min(1, 'Plano é obrigatório'), // Adicionando o campo de planoId corretamente
  enderecos: z.array(
    z.object({
      rua: z.string().optional(),
      numero: z.string().optional(),
      complemento: z.string().optional(),
      bairro: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      codigoPostal: z.string().optional(),
      pais: z.string().optional(),
    })
  ).optional(), // Endereços são opcionais, mas se forem fornecidos, seguem esse esquema
});

// Tipos inferidos a partir do schema
export type AlunoFormData = z.infer<typeof alunoSchema>;
