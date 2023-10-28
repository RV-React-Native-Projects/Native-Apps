import { View, TouchableOpacity } from "react-native";
import React from "react";
import ActivityIndicator from "@components/ActivityIndicator/ActivityIndicator";
import AppText from "@components/Text/AppText";
import _ from "lodash";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@redux/store";

export function Icon({ icon, styles }) {
  return <>{icon ? <View style={{ ...styles }}>{icon}</View> : null}</>;
}

const getButtonObj = (theme, type) => {
  return _.get(theme, type);
};
const getStyleObject = (theme, button) => {
  return _.get(theme, button);
};

export default function AppButton(props) {
  const { theme } = useAppSelector((state) => state.theme);

  const {
    onPress,
    disabled = false,
    disabledBackgroundColor,
    Title = "Button",
    Outlined,
    color = theme.primary,
    LinkButton,
    textColor = theme.primaryButtonText,
    fontWeight = "600",
    height = 40,
    width = LinkButton ? null : "100%",
    fontSize = 18,
    rounded,
    borderRadius = rounded ? 50 : 3,
    borderWidth = 1,
    borderColor = color,
    textStyle,
    leftIcon,
    IcontoEnd,
    rightIcon,
    Dotted,
    Dashed,
    borderStyle = Outlined && Dotted
      ? "dotted"
      : Outlined && Dashed
      ? "dashed"
      : "solid",
    loading = false,
    indicatorBackgroundColor = theme.primary,
    indicatorColor = theme.white,
    style,
    extraStyle,
    size = height,
    activeOpacity = 0.8,
  } = props || {};

  const buttonObj = getButtonObj(theme, size);
  const es = Array.isArray(extraStyle) ? extraStyle : [extraStyle];
  const buttonStyles = getStyleObject(theme, "solid-button-styles");

  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: disabled
              ? disabledBackgroundColor || theme.subHeader
              : Outlined
              ? theme.white
              : LinkButton
              ? "transparent"
              : color,
            height: moderateScale(height, 0.3),
            borderRadius: moderateScale(borderRadius, 0.3),
            ...style,
          }}
        >
          <ActivityIndicator
            backgroundColor={color || indicatorBackgroundColor}
            indicatorColor={indicatorColor}
          />
        </View>
      ) : (
        <>
          {LinkButton ? (
            <TouchableOpacity
              onPress={onPress}
              disabled={disabled}
              style={{ alignSelf: "center", ...style }}
            >
              <AppText
                color={
                  disabled ? disabledBackgroundColor || theme.subHeader : color
                }
                size={fontSize}
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  ...textStyle,
                }}
                fontStyle={props.fontStyle || "600.semibold"}
              >
                {Title}
              </AppText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onPress}
              disabled={disabled}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: moderateScale(height, 0.3),
                width: width,
                backgroundColor: disabled
                  ? disabledBackgroundColor || theme.subHeader
                  : Outlined
                  ? theme.white
                  : LinkButton
                  ? "transparent"
                  : color,
                borderRadius: moderateScale(borderRadius, 0.3),
                borderWidth: Outlined ? moderateScale(borderWidth, 0.3) : 0,
                borderColor: Outlined ? borderColor : null,
                borderStyle: borderStyle,
                ...theme.light_shadow,
                ...style,
              }}
            >
              {leftIcon ? (
                <View
                  style={[
                    { marginRight: moderateScale(10, 0.3) },
                    IcontoEnd && {
                      position: "absolute",
                      left: moderateScale(15, 0.3),
                    },
                  ]}
                >
                  {leftIcon}
                </View>
              ) : null}
              <AppText
                color={Outlined ? color : textColor}
                size={fontSize}
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  maxWidth: "80%",
                  ...textStyle,
                }}
                numberOfLines={1}
                fontStyle={props.fontStyle || "600.semibold"}
              >
                {Title}
              </AppText>
              {rightIcon ? (
                <View
                  style={[
                    { marginLeft: moderateScale(10, 0.3) },
                    IcontoEnd && {
                      position: "absolute",
                      right: moderateScale(15, 0.3),
                    },
                  ]}
                >
                  {rightIcon}
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
}
