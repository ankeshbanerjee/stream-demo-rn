import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";
import axios from "axios";
import { T_User } from "../../types/user.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/params";
import Spinner from "react-native-loading-spinner-overlay";
import CustomText from "../../components/CustomText";
import { storage, storeData } from "../../utils/storage.utils";
import { useAuth } from "../../context/AuthContext";
import { CommonActions } from "@react-navigation/native";

type Props = NativeStackScreenProps<AuthStackParamList, "LOGIN">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { initClient } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post<{
        user: T_User;
        token: string;
        message: string;
      }>("/login", {
        email,
        password,
      });
      await storeData(storage.KEY.STREAM_TOKEN, res.data.token);
      await storeData(storage.KEY.USER_ID, res.data.user._id);
      await initClient();
      setIsLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "MAIN" }],
        })
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <CustomText style={styles.buttonText}>Log In</CustomText>
      </TouchableOpacity>
      <CustomText style={styles.footerText}>
        Don't have an account?{" "}
        <CustomText
          style={styles.link}
          onPress={() => navigation.navigate("REGISTER")}
        >
          Register
        </CustomText>
      </CustomText>

      <Spinner visible={isLoading} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
