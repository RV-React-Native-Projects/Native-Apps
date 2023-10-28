import React from "react";
import { View } from "react-native";

export default function AppIcon(props) {
  if (React.isValidElement(props.icon)) {
    const Icon = props.icon;
    return <View style={{ ...props.style }}>{Icon}</View>;
  } else {
    return (
      <View
        style={{
          width: props.width,
          height: props.height,
        }}
      ></View>
    );
  }
}
