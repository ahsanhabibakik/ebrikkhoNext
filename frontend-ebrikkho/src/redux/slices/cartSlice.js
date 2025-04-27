import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadState = () => {
  if (typeof window === "undefined") {
    return {
      items: [],
      savedForLater: [],
      total: 0,
      shippingCost: 0,
      discount: 0,
      couponCode: "",
      isCartOpen: false,
    };
  }

  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        items: [],
        savedForLater: [],
        total: 0,
        shippingCost: 0,
        discount: 0,
        couponCode: "",
        isCartOpen: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      items: [],
      savedForLater: [],
      total: 0,
      shippingCost: 0,
      discount: 0,
      couponCode: "",
      isCartOpen: false,
    };
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, Math.min(10, quantity));
      }
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    applyCoupon: (state, action) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.shippingCost = 0;
      state.discount = 0;
      state.couponCode = "";
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    saveForLater: (state, action) => {
      const itemToSave = state.items.find((item) => item.id === action.payload);
      if (itemToSave) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.savedForLater.push(itemToSave);
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    moveToCart: (state, action) => {
      const itemToMove = state.savedForLater.find(
        (item) => item.id === action.payload
      );
      if (itemToMove) {
        state.savedForLater = state.savedForLater.filter(
          (item) => item.id !== action.payload
        );
        state.items.push(itemToMove);
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromSaved: (state, action) => {
      state.savedForLater = state.savedForLater.filter(
        (item) => item.id !== action.payload
      );
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setShippingCost,
  applyCoupon,
  clearCart,
  toggleCart,
  saveForLater,
  moveToCart,
  removeFromSaved,
} = cartSlice.actions;

export default cartSlice.reducer;
