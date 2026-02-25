import {Text, View, StyleSheet, TextInput , Button,KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function RegistrationScreen() {
        const navigation = useNavigation();
        
        const [email, onChangeEmail] = React.useState('');
        const [firstName, onChangeFirstName] = React.useState('');
        const [password, onChangePassword] = React.useState('');
        const [confirmPassword, onChangeConfirmPassword] = React.useState('');

    return (
        <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <View style={styles.inner}>  
        <View style={styles.container}>
            <Text style={styles.text}>Create Account</Text>
            
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
                
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder="First Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Button
                title="Go to Log In"
                onPress={() => {
                    navigation.navigate('LogIn');
                }}
            />  
             <Button title="Create Account" onPress={() => {
                // Handle registration logic here
            }} />


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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width : '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

});