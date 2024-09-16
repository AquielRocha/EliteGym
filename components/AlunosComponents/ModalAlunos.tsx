import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { Button, Text, YStack } from 'tamagui';
import { Aluno } from "~/src/hooks/Alunos/useQueryGetAllAlunos"; 
import {Image} from '@tamagui/image';

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
          <Image 
                  src={aluno.foto} 
                  width={100} 
                  height={100} 
                  borderRadius={50} 
                  alt="Foto do aluno"
                />
          <Text>Email: {aluno.email}</Text>
          <Text>Telefone: {aluno.telefone}</Text>
          <Text>Usuário: {aluno.tipo}</Text>
          <Text>Data de Nascimento: {new Date(aluno.dataNascimento).toLocaleDateString()}</Text>
          <Text>Objetivos: {aluno.objetivos}</Text>
          <Text>Preferências de Treino: {aluno.preferenciasTreino}</Text>
          <Text>Status do Pagamento: {aluno.statusPagamento}</Text>
          <Text>Informações Médicas: {aluno.informacoesMedicas}</Text>

          <Button onPress={onClose} marginTop="$4" backgroundColor="$primary">
            <Text>Fechar</Text>
          </Button>
        </YStack>
      </YStack>
    </Modal>
  );
};

export default AlunoModal;
