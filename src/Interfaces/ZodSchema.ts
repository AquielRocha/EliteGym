import { z } from 'zod';

const aulaSchema = z.object({
  id: z.number().int().positive(), 
  nome: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"), 
  descricao: z.string().min(1, "Descrição é obrigatória").max(500, "Descrição deve ter no máximo 500 caracteres"), 
  foto: z.string().url("URL da foto deve ser válida").optional(), 
  tipo: z.string().min(1, "Tipo é obrigatório").max(50, "Tipo deve ter no máximo 50 caracteres"), 
  video: z.string().url("URL do vídeo deve ser válida").optional(), 
});

export default aulaSchema;
