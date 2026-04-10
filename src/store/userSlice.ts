import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const savedEmail = localStorage.getItem("userEmail");

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: savedEmail ? savedEmail : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    logoutAction: (state) => {
      state.email = null;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
