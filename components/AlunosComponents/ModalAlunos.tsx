import React from 'react';
import { Modal, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, Text, YStack, XStack } from 'tamagui';
import { Aluno } from "~/src/hooks/Alunos/useQueryGetAllAlunos"; 
import { Image } from '@tamagui/image';
import { MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar @expo/vector-icons

interface AlunoModalProps {
  visible: boolean;
  aluno: Aluno | null;
  onClose: () => void;
}

const AlunoModal: React.FC<AlunoModalProps> = ({ visible, aluno, onClose }) => {
  if (!aluno) return null;

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <YStack style={styles.overlay}>
        <YStack style={styles.modalContainer}>
        
          <ScrollView contentContainerStyle={styles.content}>

            <YStack alignItems="center" marginBottom={15}>
              {aluno.fotoBase64 ? (
                <Image 
                  src={aluno.fotoBase64} 
                  width={80} 
                  height={80} 
                  borderRadius={40} 
                  alt="Foto do aluno" 
                  style={styles.avatar}
                />
              ) : (
                <MaterialIcons name="person-outline" size={80} color="#ccc" />
              )}
              <Text fontWeight="bold" fontSize={18} marginTop={8} color="#333">
                {aluno.nome}
              </Text>
            </YStack>

            {/* Informações do Aluno */}
            <YStack space={12}>
              <InfoRow label="Email" value={aluno.email} icon="email" />
              <InfoRow label="Telefone" value={aluno.telefone} icon="phone" />
              <InfoRow label="Usuário" value={aluno.tipo} icon="person" />
              <InfoRow 
                label="Nascimento" 
                value={new Date(aluno.dataNascimento).toLocaleDateString()} 
                icon="cake"
              />
              <InfoRow 
                label="Cadastro" 
                value={new Date(aluno.dataCadastro).toLocaleDateString()} 
                icon="calendar-today" 
              />
              <InfoRow 
                label="Ativo" 
                value={aluno.ativo ? 'Sim' : 'Não'} 
                icon={aluno.ativo ? "check-circle" : "cancel"} 
                color={aluno.ativo ? "green" : "red"}
              />
              <InfoRow label="Objetivos" value={aluno.objetivos} icon="flag" />
            </YStack>

            {/* Seção de Endereços */}
            {aluno.enderecos?.length > 0 && (
              <YStack marginTop={15}>
                <Text fontWeight="bold" fontSize={16} color="#333" marginBottom={8}>Endereços:</Text>
                {aluno.enderecos.map((endereco, index) => (
                  <YStack key={index} style={styles.sectionBox}>
                    <InfoRow label="Rua" value={`${endereco.rua}, ${endereco.numero}`} icon="streetview" />
                    {endereco.complemento ? (
                      <InfoRow label="Complemento" value={endereco.complemento} icon="home" />
                    ) : null}
                    <InfoRow label="Bairro" value={endereco.bairro} icon="location-city" />
                    <InfoRow label="Cidade/Estado" value={`${endereco.cidade}, ${endereco.estado}`} icon="location-on" />
                    <InfoRow label="CEP" value={endereco.codigoPostal} icon="mail" />
                    <InfoRow label="País" value={endereco.pais} icon="public" />
                  </YStack>
                ))}
              </YStack>
            )}

            {/* Seção de Mensalidades */}
            {aluno.mensalidades?.length > 0 && (
              <YStack marginTop={15}>
                <Text fontWeight="bold" fontSize={16} color="#333" marginBottom={8}>Mensalidades:</Text>
                {aluno.mensalidades.map((mensalidade, index) => (
                  <YStack key={index} style={styles.sectionBox}>
                    <InfoRow label="Valor" value={`R$ ${mensalidade.valorMensalidade}`} icon="attach-money" />
                    <InfoRow 
                      label="Vencimento" 
                      value={new Date(mensalidade.dataVencimento).toLocaleDateString()} 
                      icon="event"
                    />
                    <InfoRow 
                      label="Status" 
                      value={mensalidade.status} 
                      icon="info" 
                      color={mensalidade.status === 'Paga' ? 'green' : 'orange'} 
                    />
                    {mensalidade.dataPagamento && (
                      <InfoRow 
                        label="Pagamento" 
                        value={new Date(mensalidade.dataPagamento).toLocaleDateString()} 
                        icon="payment" 
                      />
                    )}
                  </YStack>
                ))}
              </YStack>
            )}

            {/* Botão de Fechamento */}
            <Button onPress={onClose} style={styles.closeButton}>
              <Text color="white" fontWeight="bold">Fechar</Text>
            </Button>
          </ScrollView>
        </YStack>
      </YStack>
    </Modal>
  );
};

// Componente para exibir cada linha de informação com um ícone
//@ts-ignore
const InfoRow = ({ label, value, icon, color = "#333" }) => (
  <XStack alignItems="center" marginBottom={6}>
    <MaterialIcons name={icon} size={20} color={color} style={{ marginRight: 8 }} />
    <Text fontWeight="bold" style={{ width: 100, color: "#555" }}>{label}:</Text>
    <Text style={{ color: color }}>{value}</Text>
  </XStack>
);

// Estilos do Modal
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Sobreposição mais sutil
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContainer: {
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 15,
    width: width * 0.7, // 70% da largura da tela
    maxHeight: height * 0.8, // 80% da altura da tela
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    paddingBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 1.5,
    borderColor: '#6200ee',
  },
  sectionBox: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default AlunoModal;
