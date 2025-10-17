import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeCookie } from "./cookies";

export const handleCommonErrors = (response, thunkAPI) => {
  if (response.status === 401) {
    removeCookie("token");
  }
  return thunkAPI.rejectWithValue(response.data);
};

export const createAsyncThunkWithCommonErrors = (type, asyncThunkFunction) => {
  return createAsyncThunk(type, async (args, thunkAPI) => {
    try {
      const response = await asyncThunkFunction(args, thunkAPI);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      } else {
        return handleCommonErrors(response, thunkAPI);
      }
    } catch (error) {
      return handleCommonErrors(error.response, thunkAPI);
    }
  });
};
