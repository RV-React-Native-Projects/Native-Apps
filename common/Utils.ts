import { Platform } from "react-native";
import ErrorConstants from "./ErrorConstant";
import _ from "lodash";
// import * as geolib from "geolib";

const Utils = function (ErrorConstants: any) {
  /**
   * @ngdoc
   * @name Common.Utils#ErrorObject
   * @methodOf Common.Utils
   * @description Method to get error object.
   * @param {string} errorCode - code defined in ErrorConstants
   * @param {boolean} success - true/false
   * @returns {ErrorObject} - error object containing success/fail status, error code and error message
   */

  interface errorCodeTypes {
    success?: boolean;
    code?: number;
    message?: string;
  }
  interface errortypes {
    errorCode?: number | any;
    success?: boolean;
  }
  function ErrorObject(errorCode: number, success: boolean) {
    var errorObject: any = {};
    errorObject.success = success;
    errorObject.code = errorCode;
    errorObject.message = ErrorConstants.ErrorMessages[errorCode];
    return errorObject;
  }

  function updateErrorObject(errorObject: any) {
    if (errorObject) {
      if (errorObject.data) {
        errorObject = errorObject.data;
      }
      var customMsg = "";
      if (isEmpty(customMsg)) {
        if (isEmpty(errorObject.message)) {
          customMsg = errorObject.error;
        } else {
          customMsg = errorObject.message;
        }
      }
      errorObject.message = customMsg;
    } else {
      errorObject = ErrorObject(ErrorConstants.ErrorCodes.UNKNOWN_ERROR, false);
    }
    errorObject.success = false;
    return errorObject;
  }

  function isValidEmail(email: string) {
    var emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email) {
      return emailPattern.test(email);
    } else {
      return false;
    }
  }

  function isValidPhoneNumber(phoneNumber: string) {
    var digitsPattern = /^\d+$/;
    if (phoneNumber) {
      return digitsPattern.test(phoneNumber); // returns a boolean
    } else {
      return false;
    }
  }

  function isValidPassword(password: string) {
    if (password && password.length >= 6 && password.length <= 20) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @ngdoc
   * @name Common.Utils#instanceOf
   * @methodOf Common.Utils
   * @description Method to check whether a object is an instance of particular data type
   * @param {object} Object whose type to be validated
   * @param {constructor} Constructor to match it's type with that of object's type
   * @returns {boolean} true if object is of constructor's type, otherwise false
   */
  function instanceOf(object: object, constructor: any) {
    return object instanceof constructor;
  }

  function isEmpty(stringObj: any) {
    if (!stringObj || null == stringObj || "" == stringObj) {
      return true;
    } else {
      return false;
    }
  }

  function getSearchType(text: string) {
    let type = "name";
    if (isValidEmail(text)) {
      type = "email";
    } else if (isValidPhoneNumber(text)) {
      type = "phone_number";
    }
    return type;
  }

  function isSameDate(date1: any, date2: any) {
    if (
      date1.getDate() == date2.getDate() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getYear() == date2.getYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

  function convertRupeeToPaisa(rupee: number) {
    return Math.round(rupee * 100);
  }

  function isOfTypeString(obj: any) {
    if (obj && (typeof obj === "string" || obj instanceof String)) {
      return true;
    } else {
      return false;
    }
  }

  function getDateTimeDifference(date1: any, date2: any) {
    let diff = 0;
    try {
      diff = Math.abs(date1.getTime() - date2.getTime());
    } catch (error) {
      console.log("getDateTimeDifference error :>> ", error);
    }
    return diff;
  }

  function getDateTimeDifferenceInHours(date1: any, date2: any) {
    return getDateTimeDifference(date1, date2) / 1000 / 3600;
  }

  function getDateTimeDifferenceInMinutes(date1: any, date2: any) {
    return Math.floor(getDateTimeDifference(date1, date2) / 1000 / 60);
  }

  function getDateTimeDifferenceInHoursAndMinutes(date1: any, date2: any) {
    let mins: any = getDateTimeDifferenceInMinutes(date1, date2);
    mins = mins.toString().replace(".", ":");
    return mins;
  }

  function formateMinutesToHours(minutes: number) {
    let d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMinutes(minutes);

    let date_string = `${d.getHours() > 0 ? `${d.getHours()}h` : ``} ${
      d.getMinutes() > 0 ? `${d.getMinutes()} mins` : ``
    }`;
    return date_string;
  }

  function isInteger(num: string) {
    let isInt = false;

    if (!containsAlphabetsAndSpecialCharacters(num)) {
      let toInt = parseInt(num);
      isInt = Number.isInteger(toInt);
    }

    return isInt;
  }

  function containsAlphabetsAndSpecialCharacters(str: string) {
    const format = /[ A-Za-z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let contains = format.test(str);
    return contains;
  }

  function getMapLink(
    lat = "12.924491",
    lng = "77.666512",
    lable = "Location",
    startlat = "0",
    startlng = "0"
  ) {
    // const scheme = Platform.OS === "android" ? "geo:0,0?q=" : "maps:0,0?q=";
    const scheme =
      Platform.OS === "android"
        ? `geo:${startlat},${startlng}?q=`
        : `maps:${startlat},${startlng}?q=`;
    var latLng = `${lat},${lng}`;
    var label = lable;

    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    return url;
  }

  /**
   * @ngdoc
   * @name Common.Utils#querystringParser
   * @methodOf Common.Utils
   * @param {string} query
   * @description returns object result
   * @returns {string} uri result
   */
  function queryStringParser(query: string) {
    var parser = /([^=?#&]+)=?([^&]*)/g,
      result = {},
      part;

    while ((part = parser.exec(query))) {
      var key = decodeURI(part[1]),
        value = decodeURI(part[2]);

      if (key === null || value === null || key in result) continue;
      result[key] = value;
    }

    return result;
  }

  const getFilename = (url: string) => {
    var filename = url.substring(url.lastIndexOf("/") + 1, url.length);
    return filename;
  };

  const generateNumericUniqueID = (digits: number) => {
    let str = "0123456789";
    let uuid = [];
    for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join("");
  };

  const generateUniqueID = (digits: number) => {
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
    let uuid = [];
    for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join("");
  };

  function toThreeDecimalValue(text: string) {
    return text.replace(/[^0-9.]/g, "").replace(/(\.\d{0,3}).*/g, "$1");
  }

  return {
    ErrorObject: ErrorObject,
    updateErrorObject: updateErrorObject,
    isValidPassword: isValidPassword,
    isValidEmail: isValidEmail,
    isValidPhoneNumber: isValidPhoneNumber,
    isEmpty: isEmpty,
    instanceOf: instanceOf,
    getSearchType: getSearchType,
    isSameDate: isSameDate,
    convertRupeeToPaisa: convertRupeeToPaisa,
    isOfTypeString: isOfTypeString,
    getDateTimeDifference: getDateTimeDifference,
    getDateTimeDifferenceInHours: getDateTimeDifferenceInHours,
    getDateTimeDifferenceInMinutes: getDateTimeDifferenceInMinutes,
    getDateTimeDifferenceInHoursAndMinutes:
      getDateTimeDifferenceInHoursAndMinutes,
    formateMinutesToHours: formateMinutesToHours,
    isInteger: isInteger,
    containsAlphabetsAndSpecialCharacters:
      containsAlphabetsAndSpecialCharacters,
    getMapLink: getMapLink,
    queryStringParser: queryStringParser,
    getFilename,
    generateNumericUniqueID,
    generateUniqueID,
    toThreeDecimalValue,
  };
};

export default Utils(ErrorConstants);
