import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import React from "react";

type CustomTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
};

export default function CustomText({
  style,
  children,
  ...rest
}: CustomTextProps) {
  return (
    <Text style={[{ color: "black" }, style]} {...rest}>
      {children}
    </Text>
  );
}
