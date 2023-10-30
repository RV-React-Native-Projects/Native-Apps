import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
import I18n from "i18n-js";
import AppTextInput from "@components/TextInput/AppTextInput";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import _ from "lodash";
import { useRouter } from "expo-router";
import PopularJobs from "@components/Jobs/PopularJobs";

const { height: windowHeight, width: windowWidth } = Dimensions.get("screen");

const jobTypes = ["Full-Time", "Part-Time", "Contract"];

export default function index() {
  const router = useRouter();
  const { theme } = useAppSelector((state: any) => state.theme);
  const [selecteJobType, setSelecteJobType] = useState<string>("Full-Time");
  return (
    <AppContainer scrollable={false}>
      <LoadingContainer bgColor={theme.modalBackgroundColor}>
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
            <AppText style={{ paddingTop: 10 }} size={24} fontStyle="600.bold">
              {I18n.t("screen_messages.find_job")}
            </AppText>
          </View>
          <VerticalSpacing size={15} />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              height: 50,
              // justifyContent: "space-between",
            }}
          >
            <AppTextInput
              placeholder="Serach for Job"
              activeOutlineColor={theme.gray}
              borderRadius={0}
              containerStyle={{
                width: windowWidth - 70,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
            <TouchableOpacity
              style={{
                marginLeft: 2,
                backgroundColor: theme.primary,
                width: 50,
                height: 52,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <AntDesign name="search1" size={24} color={theme.white} />
            </TouchableOpacity>
          </View>
          {/* ============= Job Types ========== */}
          <VerticalSpacing size={10} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ padding: 10, paddingHorizontal: 15 }}
            contentContainerStyle={{ columnGap: 5 }}
          >
            {_.map(jobTypes, (item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelecteJobType(item);
                  router.push(`/search/${item}`);
                }}
                style={{
                  padding: 8,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor:
                    selecteJobType !== item ? theme.gray : theme.primary,
                  borderRadius: 30,
                }}
              >
                <AppText
                  color={selecteJobType !== item ? theme.gray : theme.primary}
                >
                  {item}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <VerticalSpacing size={10} />
          {/* ============= POP jobs ============= */}
          <View>
            <PopularJobs />
          </View>
        </View>
      </LoadingContainer>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
