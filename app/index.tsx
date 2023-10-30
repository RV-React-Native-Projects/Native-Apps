import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "@components/Text/AppText";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAppSelector } from "@redux/store";
import AppContainer from "@components/Container/AppContainer";
import LoadingContainer from "@components/Container/LoadingContainer";
import AppButton from "@components/Button/AppButton";
import AppCheckBox from "@components/CheckBox/AppCheckBox";
import I18n from "i18n-js";

export default function index() {
  const { theme } = useAppSelector((state: any) => state.theme);
  return (
    <AppContainer scrollable={false}>
      <LoadingContainer>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
            }}
          >
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
              <AntDesign name="menu-fold" size={28} color={theme.subHeader} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
              {/* <FontAwesome name="user" size={28} color={theme.subHeader} /> */}
              <Image
                style={{ height: 40, width: 40, borderRadius: 25 }}
                resizeMode="cover"
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&usqp=CAU",
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <AppText
              style={{ paddingTop: 10 }}
              size={16}
              fontStyle="400.normal"
            >
              Hello Ranvijay!
            </AppText>
            <AppText style={{ paddingTop: 10 }} size={20} fontStyle="600.bold">
              {I18n.t("screen_messages.find_job")}
            </AppText>
          </View>
        </View>
      </LoadingContainer>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
