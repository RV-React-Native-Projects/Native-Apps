import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BallIndicator } from "react-native-indicators";
import { useAppSelector } from "@redux/store";

export default function LoadingContainer(props) {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.bgColor || theme.appBackgroundColor,
          position: "relative",
          paddingTop: props.paddingTop || 0,
          ...props.style,
        },
      ]}
    >
      {props.children}
      {props.loading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(64,64,64, 0.5)",
              zIndex: 100,
              elevation: 10000,
              ...props?.loadingContainerStyles,
            },
          ]}
        >
          <BallIndicator
            color={props.color || theme.white}
            maxScale={1.2}
            minScale={0.2}
            size={60}
          />
        </View>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    minHeight: "100%",
    zIndex: 110,
    paddingTop: Platform.OS === "web" ? 15 : 0,
  },
});
