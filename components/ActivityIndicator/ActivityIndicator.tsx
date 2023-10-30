import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ActivityIndicator as Indicator } from "react-native-paper";
import { useAppSelector } from "@redux/store";

interface ActivityIndicatortypes {
  backgroundColor?: string;
  indicatorColor?: string;
  indicatorSize?: "small" | "large";
  size?: number;
}

export default function ActivityIndicator(props: ActivityIndicatortypes) {
  const { theme } = useAppSelector((state: any) => state.theme);

  const isLarge: boolean = props?.indicatorSize === "large";

  const {
    backgroundColor = theme.primary,
    indicatorColor = theme.secondary,
    indicatorSize = "small",
    size = isLarge ? 70 : 40,
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
