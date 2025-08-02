import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      customerInfo: null,
    };
  }

  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        customerInfo: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      customerInfo: null,
    };
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      // Save to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.customerInfo = null;
      // Clear localStorage
      localStorage.removeItem("auth");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // Save to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
      // Save to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  updateCustomerInfo,
} = authSlice.actions;

export default authSlice.reducer;
