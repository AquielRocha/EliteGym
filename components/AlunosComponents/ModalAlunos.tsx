import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { Button, Text, YStack } from 'tamagui';
import { Aluno } from "~/src/hooks/Alunos/useQueryGetAllAlunos"; 
import { Image } from '@tamagui/image';

interface AlunoModalProps {
  visible: boolean;
  aluno: Aluno | null;
  onClose: () => void;
}

const AlunoModal: React.FC<AlunoModalProps> = ({ visible, aluno, onClose }) => {
  if (!aluno) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="rgba(0,0,0,0.5)">
        <YStack padding="$4" backgroundColor="white" borderRadius="$2" width="90%">
          <Text fontWeight="bold" fontSize="$5" marginBottom="$2">{aluno.nome}</Text>

          {/* Exibe a imagem do aluno se disponível */}
          {aluno.fotoBase64 && (
            <Image 
              src={aluno.fotoBase64} 
              width={100} 
              height={100} 
              borderRadius={50} 
              alt="Foto do aluno" 
            />
          )}

          <Text>Email: {aluno.email}</Text>
          <Text>Telefone: {aluno.telefone}</Text>
          <Text>Usuário: {aluno.tipo}</Text>
          <Text>Data de Nascimento: {new Date(aluno.dataNascimento).toLocaleDateString()}</Text>
          <Text>Data de Cadastro: {new Date(aluno.dataCadastro).toLocaleDateString()}</Text>
          <Text>Ativo: {aluno.ativo ? 'Sim' : 'Não'}</Text>
          <Text>Objetivos: {aluno.objetivos}</Text>

          {/* Exibir Endereços */}
          {aluno.enderecos?.length > 0 && (
            <>
              <Text fontWeight="bold" marginTop="$2">Endereços:</Text>
              {aluno.enderecos.map((endereco, index) => (
                <YStack key={index} marginBottom="$2">
                  <Text>Rua: {endereco.rua}, Número: {endereco.numero}</Text>
                  <Text>Complemento: {endereco.complemento}</Text>
                  <Text>Bairro: {endereco.bairro}</Text>
                  <Text>Cidade: {endereco.cidade}, {endereco.estado}</Text>
                  <Text>CEP: {endereco.codigoPostal}</Text>
                  <Text>País: {endereco.pais}</Text>
                </YStack>
              ))}
            </>
          )}

          {/* Exibir Mensalidades */}
          {aluno.mensalidades?.length > 0 && (
            <>
              <Text fontWeight="bold" marginTop="$2">Mensalidades:</Text>
              {aluno.mensalidades.map((mensalidade, index) => (
                <YStack key={index} marginBottom="$2">
                  <Text>Valor: R${mensalidade.valorMensalidade}</Text>
                  <Text>Data de Vencimento: {new Date(mensalidade.dataVencimento).toLocaleDateString()}</Text>
                  <Text>Status: {mensalidade.status}</Text>
                  {mensalidade.dataPagamento && (
                    <Text>Data de Pagamento: {new Date(mensalidade.dataPagamento).toLocaleDateString()}</Text>
                  )}
                </YStack>
              ))}
            </>
          )}

          <Button onPress={onClose} marginTop="$4" backgroundColor="$primary">
            <Text>Fechar</Text>
          </Button>
        </YStack>
      </YStack>
    </Modal>
  );
};

export default AlunoModal;
