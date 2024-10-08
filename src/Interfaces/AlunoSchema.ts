import { z } from 'zod';

// Definir o schema do Zod para o formulário de Aluno
export const alunoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  foto: z.string(),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  dataNascimento: z.string().refine(
    (value) => !isNaN(Date.parse(value)), 
    'Data de nascimento inválida'
  ),
  telefone: z.string().min(10, 'Telefone inválido').optional(),
  objetivos: z.string().optional(),
  tipoPlano: z.string().optional(),
  ativo: z.boolean(),
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
  ).optional(),

  mensalidades: z.array(
    z.object({
      aluno: z.string(),
      plano: z.object({
        id: z.number(),
        nome: z.string(),
        valor: z.number(),
        descricao: z.string()
      }),
      dataVencimento: z.string().refine(
        (value) => !isNaN(Date.parse(value)), 
        'Data de vencimento inválida'
      ),
      dataPagamento: z.string().refine(
        (value) => !isNaN(Date.parse(value)), 
        'Data de pagamento inválida'
      ).optional(),
      status: z.string()
    })
  ).optional()
});

// Tipos inferidos a partir do schema
export type AlunoFormData = z.infer<typeof alunoSchema>;
