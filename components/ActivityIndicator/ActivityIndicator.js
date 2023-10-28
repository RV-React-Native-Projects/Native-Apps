import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ActivityIndicator as Indicator } from "react-native-paper";
import { useAppSelector } from "@redux/store";

export default function ActivityIndicator(props) {
  const { theme } = useAppSelector((state) => state.theme);

  const {
    backgroundColor = theme.primary,
    indicatorColor = theme.secondary,
    indicatorSize = "small",
    size = indicatorSize === "large" ? 70 : 40,
  } = props || {};

  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size,
        backgroundColor: backgroundColor,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Indicator animating={true} color={indicatorColor} size={indicatorSize} />
    </View>
  );
}

const styles = StyleSheet.create({});
