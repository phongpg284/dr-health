import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";
import medicineReducer from "./medicineSlice";
import game from "./game";
import relativeRoleReducer from "./RelativeRoleSlice";
import greetingBot from './GreetingBot'
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

export const store = configureStore({
  reducer: {
    account: authReducer,
    medicineSet: medicineReducer,
    game: game,
    relativeRole: relativeRoleReducer,
    greetingBot: greetingBot,
    product: productSlice,
    cart: cartSlice,
  },
  preloadedState: loadState(),
  devTools: true,
});
store.subscribe(() => {
  saveState(store.getState())
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
