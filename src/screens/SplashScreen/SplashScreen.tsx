import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { styles } from "./styles";
import { storage } from "../../utils/storage.utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/params";
import CustomText from "../../components/CustomText";
import { initService } from "../../utils/axios.utils";
import { useAuth } from "../../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "SPLASH">;

export default function SplashScreen({ navigation }: Props) {
  const { initClient } = useAuth();
  useEffect(() => {
    const setup = async () => {
      initService();
      await initClient();
      const tokenExist = await storage.doesExist(storage.KEY.STREAM_TOKEN);
      setTimeout(() => {
        if (tokenExist === true) {
          navigation.replace("MAIN");
        } else {
          navigation.replace("AUTH");
        }
      }, 1000);
    };
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <CustomText
        style={{
          fontSize: 24,
        }}
      >
        Stream Demo
      </CustomText>
    </View>
  );
}
