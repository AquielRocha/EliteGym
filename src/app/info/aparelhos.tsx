import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function infoAparelhos() {
  return (
    <>
      <ScreenContent path="app/info/aparelho.tsx" title="aparelho" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
