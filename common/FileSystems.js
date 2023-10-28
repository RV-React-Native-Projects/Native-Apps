import React, { useReducer } from "react";
import * as FileSystem from "expo-file-system";

import { StyleSheet, Text, View } from "react-native";

function reducer(state, { payload, type }) {
  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_DOWNLOADING_PROGRESS":
      return { ...state, downloadingProgress: payload };
  }
}

export default function FileSystems(url) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    downloadingProgress: "",
  });

  const { loading, downloadingProgress } = state;

  const setLoading = (val) => {
    dispatch({ type: "SET_LOADING", payload: val });
  };

  const setDownLoadingProgress = (val) => {
    dispatch({ type: "SET_DOWNLOADING_PROGRESS", payload: val });
  };

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownLoadingProgress(progress);
  };

  const  downloadResumable =  FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + "small.mp4",
    {},
    callback,
  );

  try {
  const { uri } = await downloadResumable.downloadAsync();
  console.log('Finished downloading to ', uri);
} catch (e) {
  console.error(e);
}

try {
  await downloadResumable.pauseAsync();
  console.log('Paused download operation, saving for future retrieval');
  AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
} catch (e) {
  console.error(e);
}

try {
  const { uri } = await downloadResumable.resumeAsync();
  console.log('Finished downloading to ', uri);
} catch (e) {
  console.error(e);
}

  return (
    <View>
      <Text>FIleSystems</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
