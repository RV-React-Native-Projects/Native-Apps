import React, { createContext, useEffect, useState } from "react";
import Message from "../common/Message.json";
import I18n from "i18n-js";

I18n.translations = Message;
I18n.fallbacks = true;
I18n.defaultLocale = "en-US";
I18n.Locales = { languageTag: "en-US" };

const MessagesContext = createContext();

export function MessagesContextProvider(props) {
  const default_language = "en-US";
  const [locale, setLocale] = useState(default_language);

  const setLanguage = (lang) => {
    setLocale(lang);
    // AsyncStorage.setItem("LANGUAGE", lang);
  };

  useEffect(() => {
    I18n.locale = locale;
  }, [locale]);

  useEffect(() => {
    async function languageFetch() {
      // const language = await AsyncStorage.getItem("LANGUAGE");
      setLocale(default_language || language);
    }
    languageFetch();
  }, []);

  return (
    <MessagesContext.Provider value={{ locale, setLanguage }}>
      {props.children}
    </MessagesContext.Provider>
  );
}

export default MessagesContext;
