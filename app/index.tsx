import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "@components/Text/AppText";

export default function index() {
  return (
    <View>
      <AppText>index</AppText>
      <AppText color={"#F00"}>index</AppText>
      <AppText color={"#F00"}>index</AppText>
      <AppText color={"#F00"}>index</AppText>
      <AppText>index</AppText>
      <AppText color={"#F00"}>index</AppText>
    </View>
  );
}

const styles = StyleSheet.create({});
