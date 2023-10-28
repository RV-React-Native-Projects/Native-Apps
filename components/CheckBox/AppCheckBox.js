import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";

export default function AppCheckBox(props) {
  const [isChecked, setChecked] = useState(props.checked || false);
  const { theme } = useAppSelector((state) => state.theme);

  const {
    title = "",
    CheckBoxColor = isChecked ? theme.primary : theme.grayText,
    fontColor = theme.subHeader,
    fontSize = 14,
    fontStyle = "400.medium",
    getChecked = false,
    onPressChackBox,
  } = props || {};

  useEffect(() => {
    if (getChecked) {
      if (isChecked) {
        getChecked(isChecked);
      }
    }
  }, [isChecked]);

  const toggleCheckBox = () => {
    setChecked(!isChecked);
  };

  return (
    <Pressable
      style={styles.section}
      onPress={() => {
        toggleCheckBox();
        onPressChackBox(isChecked);
      }}
    >
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={toggleCheckBox}
        color={CheckBoxColor}
      />
      {title ? (
        <AppText fontStyle={fontStyle} size={fontSize} color={fontColor}>
          {title}
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
});
