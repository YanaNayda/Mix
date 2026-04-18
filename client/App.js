import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootStack />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

 
