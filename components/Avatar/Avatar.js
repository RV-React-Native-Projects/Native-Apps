import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";

export default function Avatar(props) {
  const { theme } = useAppSelector((state) => state.theme);
  const {
    picUrl,
    size = 40,
    label,
    backgroundColor,
    initials,
    textSize = 20,
    outlined = false,
    labelColor = outlined ? theme.primary : theme.white,
    dashed,
    dotted,
    borderColor = theme.primary,
    onPress,
    icon,
  } = props || {};

  let URL = picUrl;
  if (typeof URL === "string") {
    URL = { uri: picUrl };
  } else {
    URL = picUrl;
  }

  let letter = label || initials || "AB";

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      {picUrl ? (
        <Image
          source={URL}
          resizeMode="cover"
          style={{
            height: size,
            width: size,
            borderRadius: size,
          }}
        />
      ) : icon ? (
        <View
          style={{
            height: size,
            width: size,
            borderRadius: size,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: outlined
              ? "transparent"
              : backgroundColor || "#C4421A",
            borderWidth: outlined ? 1 : 0,
            borderStyle:
              outlined && dashed
                ? "dashed"
                : outlined && dotted
                ? "dotted"
                : outlined
                ? "solid"
                : null,
            borderColor: borderColor || "#000",
          }}
        >
          {icon}
        </View>
      ) : (
        <View
          style={[
            {
              height: size,
              width: size,
              borderRadius: size,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: outlined ? 1 : 0,
              borderStyle:
                outlined && dashed
                  ? "dashed"
                  : outlined && dotted
                  ? "dotted"
                  : outlined
                  ? "solid"
                  : null,
              borderColor: borderColor || "#000",
              backgroundColor: outlined
                ? "transparent"
                : backgroundColor || "#C4421A",
            },
            !outlined ? { ...styles.shadow } : null,
          ]}
        >
          <AppText
            color={labelColor}
            size={textSize}
            style={{ textTransform: "uppercase" }}
          >
            {letter}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 5,
  },
});
