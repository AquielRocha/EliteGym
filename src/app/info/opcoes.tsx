import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function infoOpcoes() {
  return (
    <>
      <ScreenContent path="app/info/rapaz.tsx" title="rapaz" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
