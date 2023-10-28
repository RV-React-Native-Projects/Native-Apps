import React, { memo } from "react";
import {
  StatusBar,
  View,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { KeyboardAvoidingView } from "native-base";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppSelector } from "@redux/store";

const { windowHieght } = Dimensions.get("screen").height;

function AppContainer(props) {
  const { theme, isDarkMode } = useAppSelector((state) => state.theme);

  const {
    children,
    statusBarColor = theme.modalBackgroundColor,
    barStyle = isDarkMode ? "light-content" : "dark-content",
    hidden = false,
    translucent = true,
    hideStatusbar = false,
    style,
    ContainerStyle,
    scrollable = true,
    KeyboardAvoidingViewBehavior = "none",
  } = props || {};
  const insets = useSafeAreaInsets();

  var isIOS = Platform.OS === "ios";

  return (
    <KeyboardAvoidingView
      behavior={KeyboardAvoidingViewBehavior}
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      {hideStatusbar ? null : (
        <View
          style={{
            // backgroundColor: statusBarColor,
            height: isIOS ? insets.top : null,
            zIndex: 125,
          }}
        >
          <StatusBar
            barStyle={barStyle}
            StatusBarStyle={barStyle}
            backgroundColor={statusBarColor}
            animated={true}
            StatusBarAnimation="slide"
            hidden={hidden}
            translucent={translucent}
          />
        </View>
      )}
      {scrollable ? (
        <ScrollView
          style={{ flex: 1, minHeight: windowHieght, ...style }}
          contentContainerStyle={{ paddingBottom: 150, ...ContainerStyle }}
        >
          {hideStatusbar ? (
            <View>{children}</View>
          ) : (
            <SafeAreaView style={{ flex: 1, ...style }}>
              {children}
            </SafeAreaView>
          )}
        </ScrollView>
      ) : hideStatusbar ? (
        <>
          <StatusBar
            barStyle="default"
            StatusBarStyle="default"
            backgroundColor="transparent"
            animated={true}
            StatusBarAnimation="slide"
            hidden={false}
            translucent={true}
          />
          <View style={{ flex: 1, ...style }}>{children}</View>
        </>
      ) : (
        <SafeAreaView style={{ flex: 1, ...style }}>
          <View style={{ marginTop: isIOS ? -insets.top : null }} />
          {children}
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
}

export default memo(AppContainer);
