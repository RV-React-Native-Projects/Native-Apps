import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import theme from "@common/Theme";
import AppText from "@components/Text/AppText";
import { moderateScale } from "react-native-size-matters";
import I18n from "i18n-js";

export default function TextInputRNP(props) {
  const {
    label = "Enter the Label",
    Outlined = true,
    error = false,
    left,
    right,
    disabled = false,
    placeholder = "Placeholder goes Here",
    errormsg = I18n.t("error_messages.field_required"),
    onChangeText,
    selectionColor = theme.primary,
    value,
    activeOutlineColor = theme.primary,
    multiline,
    onFocus,
    onBlur,
    editable = true,
    height = 50,
    backgroundColor = disabled ? theme.light : theme.white,
    styles,
    autoFocus = false,
    secureTextEntry = false,
    required = true,
  } = props || {};

  const [text, setText] = useState("");

  return (
    <>
      <TextInput
        label={() => (
          <AppText fontStyle="600.semibold" size={14} color={theme.title}>
            {label}
          </AppText>
        )}
        value={value || text}
        mode={Outlined ? "outlined" : "flat"}
        onChangeText={onChangeText ? onChangeText : (text) => setText(text)}
        activeUnderlineColor={theme.primary}
        error={error}
        disabled={disabled}
        right={right}
        left={left}
        placeholder={placeholder}
        placeholderTextColor={theme.black}
        selectionColor={selectionColor}
        activeOutlineColor={activeOutlineColor}
        multiline={multiline}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        keyboardType="default"
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        textColor={theme.black}
        style={{
          height: moderateScale(height, 0.3),
          width: "100%",
          backgroundColor: backgroundColor,
          fontSize: moderateScale(15, 0.3),
          color: theme.white,
          ...styles,
        }}
        outlineStyle={{
          borderColor: error ? theme.warning : theme.cardGray,
          backgroundColor: backgroundColor,
          backfaceVisibility: "hidden",
        }}
        {...props}
      />
      {error && errormsg ? (
        <AppText
          fontStyle="600.semibold"
          size={10}
          color={theme.warning}
          style={{ padding: 5 }}
        >
          {errormsg}
        </AppText>
      ) : null}
    </>
  );
}
