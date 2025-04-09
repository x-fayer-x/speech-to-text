import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Import du type

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = useNavigation();

  const handleLogin = async () => {
    // Handle login logic here
    if (id && password) {
      Alert.alert('Login Successful', `Welcome back, ${id}!`);
    } else {
      Alert.alert('Error', 'Please enter both ID and password.');
    }
    // il faut comenter navigation.navigate('Main'); si je veux tester le fetch et le decommanter pour acceder a mon record description
    // navigation.navigate('Main');
    try {
      // Envoyer les données au backend
      const response = await fetch('http://vps-692a3a83.vps.ovh.net:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      });
  
      // Vérifier la réponse du backend
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Login Successful', `Welcome back, ${id}!`);
        navigation.navigate('Main'); // Naviguer vers TabLayout
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const navigateToRegister = () => {
    navigation.navigate('Register'); // Navigate to the Register page
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter ID"
        value={id}
        onChangeText={setId}
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