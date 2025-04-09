import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Import du type RootStackParamList

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  
  type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  // Fonction pour gérer l'enregistrement
  const handleRegistration = async () => {
    // Handle registration logic here
    console.log('Registered with:', { username, password, Email, ConfirmPassword });
    // You can add your registration logic here, such as API calls or form validation
    try {
          // Envoyer les données au backend
          const response = await fetch('http://vps-692a3a83.vps.ovh.net:5050/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              Email: Email,
              ConfirmPassword: ConfirmPassword,
            }),
          });
      
          // Vérifier la réponse du backend
          const data = await response.json();
      
          if (response.ok) {
            Alert.alert('register Successful', `Welcome back, ${username}!`);
            navigation.navigate('Register'); // Naviguer vers TabLayout
          } else {
            Alert.alert('register Failed', data.message || 'Invalid inputs');
          }
        } catch (error) {
          console.error('register error:', error);
          Alert.alert('Error', 'An error occurred. Please try again.');
        }
      };

  // Navigation vers la page de connexion
  const navigateToLogin = () => {
    navigation.navigate('Login'); // Naviguer vers l'écran Login
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={password}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Create your new account" onPress={handleRegistration} />
      <Button title="Login" onPress={navigateToLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegistrationPage;