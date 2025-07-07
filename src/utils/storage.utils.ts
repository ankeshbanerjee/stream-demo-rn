import AsyncStorage from "@react-native-async-storage/async-storage";

export enum KEY {
  STREAM_TOKEN = "STREAM_TOKEN",
  USER_ID = "USER_ID",
}

export const getData = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Error getting data from AsyncStorage", error);
    return null;
  }
};

export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    // let stringValue: string;

    // if (value instanceof ArrayBuffer) {
    //   // Convert ArrayBuffer to base64
    //   stringValue = Buffer.from(value).toString("base64");
    // } else {
    //   stringValue = JSON.stringify(value);
    // }

    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error storing data in AsyncStorage", error);
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from AsyncStorage", error);
  }
};

export const doesExist = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error("Error checking existence in AsyncStorage", error);
    return false;
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage", error);
  }
};

export const storage = {
  getData,
  storeData,
  removeData,
  doesExist,
  clearStorage,
  KEY,
};
