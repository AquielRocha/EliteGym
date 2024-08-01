import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button }from 'tamagui';

interface ToastProps {
  title?: string;
  description?: string;
  status?: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, description, status = 'success', duration = 3000, onClose }) => {
  return (
    <View style={[styles.toast, status === 'success' ? styles.success : styles.error]}>
      <View style={styles.toastContent}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {description ? <Text style={styles.description}>{description}</Text> : null}
        <Button onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
  },
  toastContent: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  description: {
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ffffff80',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Toast;
