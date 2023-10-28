import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Provider as StoreProvider } from "react-redux";
import store, { RootState } from "@redux/store";
import {
  DefaultTheme as NavigatiorLightTheme,
  DarkTheme as NavigatiorDarkTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from "react-native-paper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { theme, isDarkMode } = RootState.theme;

  const paperTheme = isDarkMode ? PaperDarkTheme : PaperLightTheme;
  const navigationTheme = isDarkMode
    ? NavigatiorDarkTheme
    : NavigatiorLightTheme;
  const config = {
    useSystemColorMode: true,
    initialColorMode: isDarkMode ? "dark" : "light",
  };
  const nativeBaseTheme = extendTheme({ config });

  return (
    <StoreProvider store={store}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider
            // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            value={navigationTheme}
          >
            <Stack
              screenOptions={{ headerShown: false }}
              initialRouteName="index"
            >
              <Stack.Screen name="index" options={{}} />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
