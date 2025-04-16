import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Import du type
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = useNavigation();

  type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  // console.log('Navigation object:', navigation);
  
  const navigateToRegister = () => {
    navigation.navigate('Register'); // Navigate to the Register page
  };

  const handleLogin = async () => {
    // Handle login logic here
    if (email && password) {
      console.log('Login check', `yur Emailconnection, ${email}!`);
    } else {
      console.log('Error', 'Please enter both ID and password.');
    }
    // il faut comenter navigation.navigate('Main'); si je veux tester le fetch et le decommanter pour acceder a mon record description
    // navigation.navigate('Main');
    try {
      // Envoyer les données au backend
      const response = await fetch('http://vps-692a3a83.vps.ovh.net:5050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          password: password,
        }),
      });
  
      //verification de la reponse en brut 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // pour lire la response en brut si j'ai besoin de debugg
      // const textResponse = await response.text();
      // console.log('Raw response from server:', textResponse);

      const data = await response.json(); // Lire directement en JSON
      console.log('Response from server:', data);

      // stockage du session token en local, en acces dans toute l'appli
      if (data.Token) {
        await AsyncStorage.setItem('session_token', data.Token);
        console.log('Token stored successfully');
      }
    
      if (response.ok) {
        Alert.alert('Login Successful', `Welcome back, ${email}!`);
        navigation.navigate('Main'); // Naviguer vers TabLayout
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="register now" onPress={navigateToRegister} />
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

export default LoginPage;