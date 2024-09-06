import { z } from 'zod';

// Schema para Endereco
export const EnderecoSchema = z.object({
  rua: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  codigoPostal: z.string(),
  pais: z.string(),
});

// Schema para Aluno
export const AlunoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string().email(),
  foto: z.string().url().optional(),
  tipo: z.string(),
  dataNascimento: z.string(), // Pode ser ajustado para z.date() se preferir trabalhar com Date diretamente
  telefone: z.string(),
  objetivos: z.string(),
  tipoPlano: z.string(),
  statusPagamento: z.string(),
  informacoesMedicas: z.string().optional(),
  preferenciasTreino: z.string(),
  aulas: z.number(),
  ativo: z.boolean(),
  enderecosJoin: z.array(EnderecoSchema),
});
