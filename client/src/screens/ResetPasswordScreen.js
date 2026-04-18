import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function isValidEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const onSubmit = () => {
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    // TODO: call your reset-password API
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.container}>
            <Text style={styles.text}>Reset password</Text>

            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Button title="Send reset link" onPress={onSubmit} />

            <View style={styles.spacer} />

            <Button
              title="Back to Log In"
              onPress={() => navigation.navigate('LogIn')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputError: {
    borderColor: '#c00',
  },
  errorText: {
    color: '#c00',
    marginBottom: 8,
    width: '80%',
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  spacer: {
    height: 16,
  },
});
