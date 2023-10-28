import Config from "react-native-config";

const linking = {
  prefixes: [`${Config.SCHEME}://app`, "https://ts_driver.com"],
  config: {
    screens: {
      Landing_Page: {
        path: "landing",
      },
      Login_Page: {
        path: "login",
      },
      Otp_Page: {
        path: "otp",
      },
      Tab_Home: {
        initialRouteName: "home",
        screens: {
          Trip_Details_Page: {
            path: "trip_details/:tripId",
            parse: { tripId: (tripId) => `${tripId}` },
          },
          Home_Page: {
            path: "home",
          },
          Profile_Page: {
            path: "profile",
          },
          Notification_Page: "notification",
          VehicleDocument_Page: {
            path: "vehicledocument/:vehicleId",
            parse: {
              vehicleId: (vehicleId) => `${vehicleId}`,
            },
          },
          CompleteTrip_Page: {
            path: "completetrip/:tripId",
            parse: {
              tripId: (tripId) => `${tripId}`,
            },
          },
          TripDocument_Page: {
            path: "tripdocument/:id",
            parse: {
              id: (id) => `${id}`,
            },
          },
          PodReceived_Page: {
            path: "podreceived/:id",
            parse: {
              id: (id) => `${id}`,
            },
          },
          Settings: "settings",
          TripExpense_Page: {
            path: "tripexpense/:tripId/:tripStatus",
            parse: {
              tripId: (tripId) => `${tripId}`,
              tripStatus: (tripStatus) => `${tripStatus}`,
            },
          },
          AddEditTripExpense_Page: {
            path: "addedit_tripexpense/:tripId",
            parse: {
              tripId: (tripId) => `${tripId}`,
            },
          },
        },
      },

      Tab_Attendance: {
        initialRouteName: "attendance",
        screens: {
          Attendance_Page: {
            path: "attendance",
          },
          AttendanceDetails_Page: {
            path: "attendance_details",
          },
          DateFilter_Page: {
            path: "datefilter",
          },
        },
      },
    },
  },
};

export default linking;
