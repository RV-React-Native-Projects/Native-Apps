import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "@components/Text/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "@redux/store";
import AppContainer from "@components/Container/AppContainer";
import LoadingContainer from "@components/Container/LoadingContainer";

export default function index() {
  const { theme } = useAppSelector((state: any) => state.theme);
  return (
    <AppContainer scrollable={false}>
      <LoadingContainer
        // loading={appLoading}
        onStartShouldSetResponder={() => console.log("You click by View")}
      >
        <View>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
            <MaterialCommunityIcons name="menu" size={24} color={theme.title} />
          </TouchableOpacity>
          {/* <AppText>index</AppText>
      <AppText color={"#F00"}>index</AppText>
      <AppText color={"#F00"}>index</AppText>
      <AppText color={"#F00"}>index</AppText>
      <AppText>index</AppText>
      <AppText color={"#F00"}>index</AppText> */}
        </View>
      </LoadingContainer>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
