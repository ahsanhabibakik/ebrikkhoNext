import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper to get token
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

// Async thunks for backend API
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  const data = await res.json();
  return data.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  const data = await res.json();
  return data.data;
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ itemId, quantity }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ quantity })
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  const data = await res.json();
  return data.data;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (itemId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${itemId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to remove from cart");
  const data = await res.json();
  return data.data;
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error("Failed to clear cart");
  const data = await res.json();
  return data.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isCartOpen: false,
    loading: false,
    error: null,
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => { state.loading = true; state.error = null; }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => { state.loading = false; state.error = action.error.message; }
      );
  }
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
