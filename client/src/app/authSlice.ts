import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  role: string;
  email: string;
  id: string;
  roleId: string;
}

const initialState: Partial<AuthState> = {
  accessToken: "",
  refreshToken: "",
  role: "",
  email: "",
  id: "",
  roleId: "",
};

export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    updateToken: (state: any, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.roleId = action.payload.roleId;
    },
    logOut: (state: any) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.email = "";
      state.role = "";
      state.id = "";
      state.roleId = "";
    },
  },
});

export const { updateToken, logOut } = authSlice.actions;
export default authSlice.reducer;
