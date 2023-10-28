import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import themeReducer from "./reducers/ThemeSlice";

export const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const RootState = store.getState();

export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;

// export const AppThunk = (dispatch, getState) => {
//   // define your thunk logic here
// };
