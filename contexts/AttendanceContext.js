import React, { createContext, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import AnalyticsHelper from "@helpers/AnalyticsHelper";

const AttendanceContext = createContext();

export const AuthState = {
  unknown: "unknown",
  clockedIn: "clockedIn",
  clockedOut: "clockedOut",
};

export function AttendanceContextProvider(props) {
  const [clockedID, setClockedID] = useState(null);
  const [clockedIn, setClockedIn] = useState(null);
  const [clockedOut, setClockedOut] = useState(null);
  // const [isClockedIn, setIsClockedIn] = useState(null);

  useLayoutEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    try {
      const clockID = await AsyncStorage.getItem("Driver_ClockID");
      setClockedID(JSON.parse(clockID));
      const clockInAt = await AsyncStorage.getItem("Driver_Clocked_inAt");
      setClockedIn(JSON.parse(clockInAt));
      const clockOutAt = await AsyncStorage.getItem("Driver_ClockOut");
      setClockedOut(clockOutAt);
    } catch (e) {
      console.log("Error in storing==>", e);
    }
  };

  const isUserClockedIn = () => {
    if (clockedID && clockedIn) {
      return true;
    } else {
      return false;
    }
  };

  console.log("isUserClockedIn==>", isUserClockedIn());
  if (clockedID) console.log("clockedID==>", clockedID);
  if (clockedIn) console.log("clockedID==>", clockedIn);
  if (clockedOut) console.log("clockedID==>", clockedOut);

  const attendanceLogout = async () => {
    try {
      await AsyncStorage.setItem("Driver_ClockID", "");
      setClockedID(null);
      await AsyncStorage.setItem("Driver_Clocked_inAt", "");
      setClockedIn(null);
      await messaging().deleteToken();
      await AsyncStorage.setItem("Driver_ClockOut", "");
      setClockedOut(null);
    } catch (e) {
      console.log("Error in storing==>", e);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        clockedID: clockedID,
        setClockedID: setClockedID,
        clockedIn: clockedIn,
        setClockedIn: setClockedIn,
        clockedOut: clockedOut,
        setClockedOut: setClockedOut,
        isUserClockedIn: isUserClockedIn,
        attendanceLogout: attendanceLogout,
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
}

export default AttendanceContext;
