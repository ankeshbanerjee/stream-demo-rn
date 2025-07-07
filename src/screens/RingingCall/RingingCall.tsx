import { StyleSheet } from "react-native";
import {
  StreamCall,
  useCalls,
  RingingCallContent,
} from "@stream-io/video-react-native-sdk";
import { SafeAreaView } from "react-native-safe-area-context";

export const RingingCalls = () => {
  // collect all ringing kind of calls managed by the SDK
  const calls = useCalls().filter((c) => c.ringing);
  // for simplicity, we only take the first one but
  // there could be multiple calls ringing at the same time
  const ringingCall = calls[0];
  if (!ringingCall) return null;

  return (
    <StreamCall call={ringingCall}>
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <RingingCallContent />
      </SafeAreaView>
    </StreamCall>
  );
};
