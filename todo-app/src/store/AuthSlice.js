import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("auth/signup", async (data) => {
  console.log("Data", data);
  try {
    const res = await axios.post("http://localhost:5000/signup", data);
    window.localStorage.setItem("token", res.data.data.token);
    console.log("singup data", res.data);
    return res.data.data;
  } catch (error) {
    console.log("signup err", error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ data, navigate }) => {
    try {
      const res = await axios.post("http://localhost:5000/login", data);
      console.log("login data", res.data.data.token);
      window.localStorage.setItem("token", res.data.data.token);
      navigate("/");
      return res.data.data;
    } catch (error) {
      console.log("login err", error);
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async (token) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/getLoggedInUser",
        token
      );
      return res.data.data;
    } catch (error) {}
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isUserLoggedIn: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserLoggedIn = action.payload ? true : false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserLoggedIn = action.payload ? true : false;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) =>{
      state.user = action.payload;
      state.isUserLoggedIn = action.payload ? true : false;

    })
  },
});

export const { setIsUpdate } = authSlice.actions;
export default authSlice.reducer;
