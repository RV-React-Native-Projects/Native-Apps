import React from "react";
import { Platform, Alert } from "react-native";
import I18n from "i18n-js";

export const appAlert = (
  title,
  message = "",
  buttons = [
    {
      text: "ok",
      style: "cancel",
    },
  ],
  isCancelable = true,
) => {
  if (Platform.OS != "web") {
    Alert.alert(title, message, [...buttons], { cancelable: isCancelable });
  } else {
    alert(`${title} \n${message}`);
  }
};
export const prestoConfirm = (
  title,
  message,
  buttons,
  isCancelable,
  callBack,
) => {
  if (Platform.OS != "web") {
    Alert.alert(title, message, [...buttons], { cancelable: isCancelable });
  } else {
    callBack(confirm(`${title} \n${message}`));
  }
};

export const AsyncAlert = async (
  title,
  message,
  successTitle,
  cancelTitle,
  isCancelable,
) =>
  new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: successTitle,
          onPress: () => {
            resolve("yes");
          },
        },
        {
          text: cancelTitle,
          onPress: () => resolve("cancel"),
          style: "cancel",
        },
      ],
      { cancelable: isCancelable },
    );
  });

export const alertBox = (title, message = "") =>
  appAlert(
    title,
    message,
    [
      {
        text: I18n.t("screen_messages.common.button_ok"),
        style: "cancel",
      },
    ],
    false,
  );
