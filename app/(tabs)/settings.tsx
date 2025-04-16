import { Text, View, Button, Alert } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Import du type RootStackParamList

export default function Settings() {

  type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
    const navigation = useNavigation<LoginScreenNavigationProp>();
    // console.log('Navigation object:', navigation);

  const handleLogout = () => {
    // Logique de déconnexion (par exemple, réinitialiser les états globaux ou supprimer les tokens)
    Alert.alert("Logged Out", "You have been logged out successfully.");
    navigation.navigate("Login"); // Rediriger vers la page Login
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useThemeColor({}, "background"),
      }}
    >
      <Text>Settings page</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}