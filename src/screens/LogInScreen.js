import {Text, View, StyleSheet, Button, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
 

export default function LogInScreen() {

    const navigation = useNavigation();
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
        <View style={styles.inner}>  
        <View style={styles.container}>
            <Text style={styles.text}> Log In </Text>

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
                secureTextEntry={true}
            />

            <Button
                title="Create Account"
                onPress={() => {
                    navigation.navigate('Registration');
                }}
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
  },
     input: {
        height: 40,
        width : '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },

   
});