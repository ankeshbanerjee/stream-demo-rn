import {
  StreamVideoClient,
  StreamVideoRN,
  User,
} from "@stream-io/video-react-native-sdk";
import { AndroidImportance } from "@notifee/react-native";
import { storage } from "./storage.utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setPushConfig() {
  StreamVideoRN.setPushConfig({
    // pass true to inform the SDK that this is an expo app
    isExpo: true,

    ios: {
      // add your push_provider_name for iOS that you have setup in Stream dashboard
      pushProviderName: __DEV__ ? "apn-video-staging" : "apn-video-production",
    },

    android: {
      // the name of android notification icon (Optional, defaults to 'ic_launcher')
      smallIcon: "ic_launcher",
      // add your push_provider_name for Android that you have setup in Stream dashboard
      //   pushProviderName: __DEV__
      //     ? "firebase-video-staging"
      //     : "firebase-video-production",
      pushProviderName: "FirebasePushProvider",
      // configure the notification channel to be used for incoming calls for Android.
      incomingCallChannel: {
        id: "stream_incoming_call",
        name: "Incoming call notifications",
        // This is the advised importance of receiving incoming call notifications.
        // This will ensure that the notification will appear on-top-of applications.
        importance: AndroidImportance.HIGH,
        // optional: if you dont pass a sound, default ringtone will be used
        // sound: "<url to the ringtone>",
      },
      // configure the functions to create the texts shown in the notification
      // for incoming calls in Android.
      incomingCallNotificationTextGetters: {
        getTitle: (userName: string) => `Incoming call from ${userName}`,
        getBody: (_userName: string) => "Tap to answer the call",
        getAcceptButtonTitle: () => "Accept",
        getDeclineButtonTitle: () => "Decline",
      },
    },

    // add the async callback to create a video client
    // for incoming calls in the background on a push notification
    createStreamVideoClient: async () => {
      //   const userId = await AsyncStorage.getItem("@userId");
      //   const userName = await AsyncStorage.getItem("@userName");
      //   if (!userId) return undefined;

      //   // an example promise to fetch token from your server
      //   const tokenProvider = async (): Promise<string> =>
      //     yourServerAPI.getTokenForUser(userId).then((auth) => auth.token);

      //   const user: User = { id: userId, name: userName };

      const userId = await storage.getData(storage.KEY.USER_ID);
      const token = await storage.getData(storage.KEY.STREAM_TOKEN);
      // const userId = await AsyncStorage.getItem(storage.KEY.USER_ID);
      // const token = await AsyncStorage.getItem(storage.KEY.STREAM_TOKEN);
      const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
      if (!userId || !token || !apiKey) {
        console.log("returning....");
        return undefined;
      }
      const user = {
        id: userId,
      };
      return StreamVideoClient.getOrCreateInstance({
        apiKey, // pass your stream api key
        user,
        tokenProvider: async () => Promise.resolve(token),
        options: {
          logLevel: "info",
          logger: (logLevel, message, ...args) => {
            console.log(message);
          },
        },
      });
    },
  });
}
