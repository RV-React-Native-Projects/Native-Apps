import React, {
  createContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import AnalyticsHelper from "@helpers/AnalyticsHelper";
import notifee, {
  AndroidBadgeIconType,
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";
import I18n from "i18n-js";
import BackgroundTimer from "react-native-background-timer";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

const UserContext = createContext();

export const AuthState = {
  unknown: "unknown",
  userLoggedIn: "userLoggedIn",
  userLoggedOut: "userLoggedOut",
};

export function UserContextProvider(props) {
  const [userState, setUserState] = useState({
    user: undefined,
    authState: AuthState.unknown,
  });
  const [address, setAddress] = useState(null);
  const [currentLocation, setLocation] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [tenantToken, setTenantToken] = useState(null);
  const [notificationID, setNotificationID] = useState(null);
  const [clockedIn, setClockedIn] = useState(null);
  const [pingTripId, setPingTripId] = useState(null);

  useLayoutEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem("Driver_Token");
      setAuthToken(JSON.parse(token));
      const tenantToken = await AsyncStorage.getItem("Driver_Tenant_Token");
      setTenantToken(JSON.parse(tenantToken));
      const fcmToken = await AsyncStorage.getItem("fcmToken_driver");
      setNotificationID(fcmToken);
      const clockInAt = await AsyncStorage.getItem("Driver_Clocked_inAt");
      setClockedIn(JSON.parse(clockInAt));
    } catch (e) {
      console.log("Error in storing==>", e);
    }
  };

  const setClockedInAt = (time = null) => {
    AsyncStorage.setItem(
      "Driver_Clocked_inAt",
      time ? JSON.stringify(time) : "",
    );
    setClockedIn(time ?? null);
  };

  if (authToken) console.log("UserContext Auth T ==>", authToken);
  if (tenantToken) console.log("UserContext Tenant T ==>", tenantToken);
  if (notificationID) console.log("notificationID ==>", notificationID);
  if (clockedIn) console.log("clockedIn AT ==>", clockedIn);
  if (pingTripId) console.log("pingTripId ==>", pingTripId);

  const setUser = (user) => {
    if (user) {
      setUserState({ user, authState: AuthState.userLoggedIn });
    } else {
      setUserState({ user: undefined, authState: AuthState.userLoggedOut });
    }
  };
  const setUserLogOut = () => {
    setUserState({ user: undefined, authState: AuthState.userLoggedOut });
  };

  const setCurrentAddress = (address) => {
    if (address) {
      setAddress(address);
    } else {
      setAddress(null);
    }
  };

  const setCurrentLocation = (address) => {
    if (address) {
      setLocation(address);
    } else {
      setLocation(null);
    }
  };

  const isUserLoggedIn = () => {
    if (userState.authState === AuthState.userLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    try {
      AsyncStorage.setItem("Driver_Token", "");
      AsyncStorage.setItem("Driver_Tenant_Token", "");
      AsyncStorage.setItem("fcmToken_driver", "");
      AsyncStorage.setItem("Driver_Clocked_inAt", "");
      messaging().deleteToken();
      setClockedInAt(null);
      stopNotification();
      setAuthToken(null);
      setTenantToken(null);
      setNotificationID(null);
      setUserLogOut();
      setUser(null);
      AnalyticsHelper.resetUser();
    } catch (e) {
      console.log("Error in Clearing Storage==>", e);
    }
  };

  var authHeader = {
    "x-client-id": tenantToken ?? null,
    Authorization: authToken ? `JWT ${authToken}` : null,
  };

  const refreshUser = () => {
    setUser(userState.user);
  };

  const startNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Attendance Channel",
      badge: false,
      lights: false,
      vibration: false,
      importance: AndroidImportance.LOW,
    });

    notifee.displayNotification({
      title: I18n.t("screen_messages.marked_present"),
      body: I18n.t("screen_messages.track_activity_here"),
      // subtitle: `kjabshcb askjda ${today_Date}`,
      asForegroundService: true,

      // colorized: true,
      android: {
        channelId,
        smallIcon: "ic_launcher_round",
        badgeIconType: AndroidBadgeIconType.SMALL,
        importance: AndroidImportance.MIN,
        visibility: AndroidVisibility.SECRET,
        autoCancel: false,
        asForegroundService: true,
        ongoing: true,
        onlyAlertOnce: true,
        showChronometer: true,
        // style: { backgroundColor: "#F00" },
        showTimestamp: true,
        color: "#0283E5",
        largeIcon: "ic_launcher",
        pressAction: {
          id: "goToAttendance",
        },
        actions: [
          {
            title: I18n.t("screen_messages.button.Track"),
            pressAction: {
              id: "goToAttendance",
            },
          },
        ],
      },
    });
  };

  const stopNotification = async () => {
    ReactNativeForegroundService.stopAll();
    ReactNativeForegroundService.remove_all_tasks();
    notifee.stopForegroundService();
    BackgroundTimer.stopBackgroundTimer();
  };

  // const value = useMemo(
  //   () => ({
  //     authState: userState.authState,
  //     user: userState.user || null,
  //     setUser: setUser,
  //     setUserLogOut: setUserLogOut,
  //     isUserLoggedIn: isUserLoggedIn,
  //     logout: logout,
  //     currentAddress: address,
  //     setCurrentAddress: setCurrentAddress,
  //     currentLocation: currentLocation,
  //     setCurrentLocation: setCurrentLocation,
  //     refreshUser: refreshUser,
  //     authToken: authToken,
  //     setAuthToken: setAuthToken,
  //     tenantToken: tenantToken,
  //     setTenantToken: setTenantToken,
  //     authHeader: authHeader,
  //     notificationID: notificationID,
  //     setNotificationID: setNotificationID,
  //     clockedInAt: clockedIn,
  //     setClockedInAt: setClockedInAt,
  //     startNotification: startNotification,
  //     stopNotification: stopNotification,
  //   }),
  //   [
  //     userState?.user,
  //     authToken,
  //     tenantToken,
  //     isUserLoggedIn(),
  //     clockedIn,
  //     notificationID,
  //   ],
  // );

  return (
    <UserContext.Provider
      value={{
        authState: userState.authState,
        user: userState.user || null,
        setUser: setUser,
        setUserLogOut: setUserLogOut,
        isUserLoggedIn: isUserLoggedIn,
        logout: logout,
        currentAddress: address,
        setCurrentAddress: setCurrentAddress,
        currentLocation: currentLocation,
        setCurrentLocation: setCurrentLocation,
        refreshUser: refreshUser,
        authToken: authToken,
        setAuthToken: setAuthToken,
        tenantToken: tenantToken,
        setTenantToken: setTenantToken,
        authHeader: authHeader,
        notificationID: notificationID,
        setNotificationID: setNotificationID,
        clockedInAt: clockedIn,
        setClockedInAt: setClockedInAt,
        startNotification: startNotification,
        stopNotification: stopNotification,
        pingTripId: pingTripId,
        setPingTripId: setPingTripId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
