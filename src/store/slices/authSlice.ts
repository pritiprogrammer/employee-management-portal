import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
const savedUser = localStorage.getItem("authUser");
const initialState: AuthState = savedUser
  ? {
      isAuthenticated: true,
      user: JSON.parse(savedUser),
    }
  : {
      isAuthenticated: false,
      user: null,
    };



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   login: (state, action: PayloadAction<User>) => {
  state.isAuthenticated = true;
  state.user = action.payload;

  localStorage.setItem("authUser", JSON.stringify(action.payload));
},

   logout: (state) => {
  state.isAuthenticated = false;
  state.user = null;

  localStorage.removeItem("authUser");
},
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;