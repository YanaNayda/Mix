import {Text, View, StyleSheet, TextInput , Button,KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { markPostRegistrationIntroPending } from '../storage/introFlags';
import { supabase } from '../services/supabase';


export default function RegistrationScreen() {

    const handleRegister = async () => {};
    const navigation = useNavigation(); 
    const [email, onChangeEmail] = React.useState('');
    const [firstName, onChangeFirstName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');
 

    return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>

        <Text style={styles.title}>Create Account</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="First Name"
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <Button title="Create Account" onPress={handleRegister} />
          </View>

          <View style={styles.linkContainer}>
            <Button
              title="Already have an account? Log In"
              onPress={() => navigation.navigate('LogIn')}
            />
          </View>
        </View>

      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  input: {
    height: 50, // 👉 стало больше
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  buttonContainer: {
    marginTop: 10,
  },

  linkContainer: {
    marginTop: 10,
  },
});