import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
// import ThemeContext from "@contexts/ThemeContext";
import AppText from "@components/Text/AppText";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@redux/store";

interface AppTextInputTypes extends TextInputProps {
  label?: string;
  labelSize?: number;
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  selectionColor?: string;
  value?: string;
  activeOutlineColor?: string;
  multiline?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  height?: number;
  backgroundColor?: string;
  styles?: object;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  focused?: boolean;
  borderRadius?: number;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  containerStyle?: object;
}

export default function AppTextInput(props: AppTextInputTypes) {
  const { theme } = useAppSelector((state: any) => state.theme);
  const {
    label, // lable for the Text Input
    labelSize = 14, // fize of the lable
    error = false, // if we have error in the field
    errorMessage = "Enter correct info", // on Error waht shoud be the message
    leftIcon, // leftIcon={}
    rightIcon, // rightIcon={}
    disabled, // diable : boolean
    placeholder = "Placeholder", // placeholder :"string"
    onChangeText, // onChnange function()
    selectionColor = theme.primary, // focus Color of the Input Value
    value, // value of the Input Area
    activeOutlineColor = theme.primary, // Border color on focus of the inputArea
    multiline, // multiline : boolean
    onFocus, // function void()
    onBlur, // function void()
    editable = true, // editable : boolean
    height = 50, // height of the text input
    backgroundColor = "#FFF", // background color of the text Input
    styles, // custome style={{}}
    autoFocus = false, // autoFocus : boolean
    secureTextEntry = false, // secureTextEntry: boolean
    focused = false, // focused: boolean
    borderRadius = 4, // costome  borderRadius as Number
    onPressLeftIcon, // function void()
    onPressRightIcon, // function void()
    containerStyle, // styles for container containerStyle={{}}
  } = props || {};

  return (
    <View>
      {label ? (
        <AppText
          size={labelSize}
          fontStyle="600.semibold"
          color={error ? theme.warning : theme.subHeader}
          style={{ marginVertical: 10 }}
        >
          {label}
        </AppText>
      ) : null}
      <View
        style={{
          borderWidth: theme.borderWidth,
          borderColor: error
            ? theme.warning
            : disabled
            ? theme.gray
            : focused
            ? theme.primary
            : theme.gray,
          borderRadius: borderRadius,
          height: moderateScale(height, 0.3),
          backgroundColor: backgroundColor,
          width: "100%",
          overflow: "hidden",
          ...containerStyle,
        }}
      >
        {leftIcon ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressLeftIcon}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: moderateScale(40, 0.3),
              height: "100%",
              position: "absolute",
              left: 0,
            }}
          >
            {leftIcon}
          </TouchableOpacity>
        ) : null}
        <TextInput
          label={label}
          value={value}
          onChangeText={onChangeText}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          selectionColor={selectionColor}
          activeOutlineColor={activeOutlineColor}
          multiline={multiline}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={editable}
          keyboardType="default"
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          style={{
            height: "100%",
            width: "100%",
            padding: 10,
            fontSize: moderateScale(16, 0.3),
            paddingLeft: leftIcon ? 45 : 10,
            paddingRight: rightIcon ? 45 : 10,
            color: theme.black,
            ...styles,
          }}
          {...props}
        />
        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPressRightIcon}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: moderateScale(40, 0.3),
              height: "100%",
              position: "absolute",
              right: 0,
            }}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      {error && errorMessage ? (
        <AppText
          color={theme.warning}
          size={16}
          fontFamily={theme.Secondary_Font}
          style={{ paddingVertical: 5 }}
        >
          {errorMessage}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
