import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper to get token
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

// Place a new order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error("Failed to place order");
    const data = await res.json();
    return data.data;
  }
);

// Fetch user's orders
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/myorders`,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload || [];
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default orderSlice.reducer;
