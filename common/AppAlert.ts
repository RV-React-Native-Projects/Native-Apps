import React from "react";
import { Platform, Alert } from "react-native";
import I18n from "i18n-js";

export const appAlert = (
  title: string,
  message = "",
  buttons: any = [
    {
      text: "ok",
      style: "cancel",
    },
  ],
  isCancelable = true
) => {
  if (Platform.OS != "web") {
    Alert.alert(title, message, [...buttons], { cancelable: isCancelable });
  } else {
    alert(`${title} \n${message}`);
  }
};
export const prestoConfirm = (
  title: string,
  message: string,
  buttons: any,
  isCancelable: boolean,
  callBack: (fn: any) => void
) => {
  if (Platform.OS != "web") {
    Alert.alert(title, message, [...buttons], { cancelable: isCancelable });
  } else {
    callBack(confirm(`${title} \n${message}`));
  }
};

export const AsyncAlert = async (
  title: string,
  message: string,
  successTitle: string,
  cancelTitle: string,
  isCancelable: boolean
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
      { cancelable: isCancelable }
    );
  });

export const alertBox = (title: string, message: string = "") =>
  appAlert(
    title,
    message,
    [
      {
        text: I18n.t("screen_messages.common.button_ok"),
        style: "cancel",
      },
    ],
    false
  );
