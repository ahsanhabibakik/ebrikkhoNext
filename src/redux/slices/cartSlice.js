import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper functions
const LOCAL_CART_KEY = "ebrikkho_guest_cart";

const isLoggedIn = () =>
  typeof window !== "undefined" &&
  !!window.localStorage.getItem("nextauth.session");

const getGuestCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) || [];
  } catch {
    return [];
  }
};

const setGuestCart = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  }
};

const getLocalCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || "[]");
  } catch {
    return [];
  }
};

// Initial state
const initialState = {
  items: getLocalCart(),
  isCartOpen: false,
  loading: false,
  error: null,
};

// Define and export fetchCart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { dispatch }) => {
    try {
      const res = await fetch("/api/cart", {
        credentials: "include",
      });
      if (res.status === 401) {
        // Not logged in - use local storage
        return { items: getLocalCart() };
      }
      const data = await res.json();
      return data.data;
    } catch {
      // API error - fallback to local storage
      return { items: getLocalCart() };
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity = 1 }, { getState }) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      if (res.status === 401) {
        // Guest user - update localStorage
        const currentItems = getLocalCart();
        const existingItem = currentItems.find(
          (item) => item.productId === product.id
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          currentItems.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          });
        }

        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(currentItems));
        return { items: currentItems };
      }

      const data = await res.json();
      return data.data;
    } catch {
      return { items: getLocalCart() };
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { getState }) => {
    // ...existing updateCartItem logic...
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { getState }) => {
    // ...existing removeFromCart logic...
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState }) => {
    // ...existing clearCart logic...
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    syncGuestCartToUser: (state) => {
      setGuestCart([]);
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
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

// Export actions and reducer
export const { toggleCart, syncGuestCartToUser } = cartSlice.actions;
export default cartSlice.reducer;
