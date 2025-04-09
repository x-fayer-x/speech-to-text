import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Import du type

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = useNavigation();

  const handleLogin = () => {
    // Handle login logic here
    if (id && password) {
      Alert.alert('Login Successful', `Welcome back, ${id}!`);
    } else {
      Alert.alert('Error', 'Please enter both ID and password.');
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