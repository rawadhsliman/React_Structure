import { createSlice } from '@reduxjs/toolkit';

import AuthApi from '../../api/server/auth';
import { createAsyncThunkWithCommonErrors } from '../../utils/apiUtils';
import { getCookie, removeCookie, setCookie } from '../../utils/cookies';

/* for call in interface */
export const LoginUser = createAsyncThunkWithCommonErrors('auth/login', async ({ userName, password }, thunkAPI) => {
  let response = await AuthApi.Login({
    userName,
    password,
  });
  return response;
});

export const logoutUser = createAsyncThunkWithCommonErrors('auth/logout', async (_, thunkAPI) => {
  let response = await AuthApi.Logout();
  return response;
});

/* for handel slice */
export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getCookie('token') || null,
    isFetchingLogin: false,
    isFetchingLogout: false,
    isSuccessLogin: false,
    isSuccessLogout: false,
    isErrorLogin: false,
    isErrorLogout: false,
  },
  reducers: {
    clearLoginState: (state) => {
      state.isFetchingLogin = false;
      state.isSuccessLogin = false;
      state.isErrorLogin = false;
      return state;
    },
    clearLogoutState: (state) => {
      state.isFetchingLogout = false;
      state.isSuccessLogout = false;
      state.isErrorLogout = false;
      return state;
    },
    clearToken: (state) => {
      state.token = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.fulfilled, (state, { payload }) => {
        setCookie('token', payload.token);
        state.token = payload.token;
        state.isFetchingLogin = false;
        state.isSuccessLogin = true;
        state.isErrorLogin = false;
        return state;
      })
      .addCase(LoginUser.rejected, (state, { payload }) => {
        state.isFetchingLogin = false;
        state.isSuccessLogin = false;
        state.isErrorLogin = true;
        return state;
      })
      .addCase(LoginUser.pending, (state) => {
        state.isFetchingLogin = true;
        state.isErrorLogin = false;
        state.isSuccessLogin = false;
        return state;
      });

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        removeCookie('token');
        state.token = null;
        state.isFetchingLogout = false;
        state.isSuccessLogout = true;
        state.isErrorLogout = false;
        return state;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isFetchingLogout = false;
        state.isSuccessLogout = false;
        state.isErrorLogout = true;
        return state;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isFetchingLogout = true;
        state.isSuccessLogout = false;
        state.isErrorLogout = false;
        return state;
      });
  },
});

export const { clearLoginState, clearLogoutState, clearToken } = AuthSlice.actions;

export const authSelector = (state) => state.auth;
