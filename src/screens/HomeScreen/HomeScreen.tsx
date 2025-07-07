import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import CustomText from "../../components/CustomText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  MainStackParamList,
  RootStackParamList,
} from "../../navigation/params";
import axios from "axios";
import { T_User } from "../../types/user.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { storage } from "../../utils/storage.utils";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import uuid from "react-native-uuid";
import { PermissionsAndroid } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

type Props = NativeStackScreenProps<MainStackParamList, "HOME">;

export default function HomeScreen({ navigation }: Props) {
  const [users, setUsers] = useState<T_User[]>([]);
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { client } = useAuth();
  if (!client) {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: "AUTH" }],
    });
    return null;
  }
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ users: T_User[]; message: string }>(
          "/users"
        );
        setUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    const requestNotificationPermission = () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    };
    const getUserId = async () => {
      const id = await storage.getData(storage.KEY.USER_ID);
      console.log("userId", id);
      if (id) setUserId(id);
    };
    const loadData = async () => {
      requestNotificationPermission();
      await getUserId();
      await fetchUsers();
    };

    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {userId && (
        <FlatList
          data={users.filter((user) => user._id != userId)}
          keyExtractor={(item) => item._id}
          renderItem={({ item: user }) => {
            console.log(user._id.length, userId?.length);
            return (
              <View style={styles.userCard}>
                <CustomText>{user.email}</CustomText>
                <View style={{ flex: 1 }} />
                <Feather
                  name="phone-call"
                  onPress={async () => {
                    await client.call("default", uuid.v4()).getOrCreate({
                      ring: true,
                      video: true,
                      data: {
                        members: [{ user_id: userId! }, { user_id: user._id }],
                      },
                    });
                  }}
                  size={20}
                />
              </View>
            );
          }}
        />
      )}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
}
