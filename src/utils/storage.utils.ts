import { MMKV } from "react-native-mmkv";

export enum KEY {
  STREAM_TOKEN = "STREAM_TOKEN",
  USER_ID = "USER_ID",
}

const mmkv = new MMKV();

export const getData = (key: string) => mmkv.getString(key);

export const storeData = (
  key: string,
  value: boolean | string | number | ArrayBuffer
) => mmkv.set(key, value);

export const removeData = (key: string) => mmkv.delete(key);

export const doesExist = (key: string) => mmkv.contains(key);

export const clearStorage = () => mmkv.clearAll();

export const storage = {
  mmkv,
  getData,
  storeData,
  removeData,
  doesExist,
  KEY,
  clearStorage,
};
