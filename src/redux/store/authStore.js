import { createSlice } from "@reduxjs/toolkit";
import { authAction } from "../action/authAction";
const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authAction.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
        // state.token = payload.token;
        return state;
        // }
      }
    );
    builder.addMatcher(
      authAction.endpoints.logout.matchFulfilled,
      (state, {}) => {
        state = initialState;
        return state;
        // }
      }
    );
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
