import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reminders");
    if (serializedState === null) {
      return {
        reminders: [],
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      reminders: [],
    };
  }
};

const initialState = loadState();

const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      const newReminder = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.reminders.push(newReminder);
      // Save to localStorage
      localStorage.setItem("reminders", JSON.stringify(state));
    },
    updateReminder: (state, action) => {
      const index = state.reminders.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      if (index !== -1) {
        state.reminders[index] = action.payload;
        // Save to localStorage
        localStorage.setItem("reminders", JSON.stringify(state));
      }
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== action.payload
      );
      // Save to localStorage
      localStorage.setItem("reminders", JSON.stringify(state));
    },
    toggleReminderComplete: (state, action) => {
      const reminder = state.reminders.find(
        (reminder) => reminder.id === action.payload
      );
      if (reminder) {
        reminder.completed = !reminder.completed;
        // Save to localStorage
        localStorage.setItem("reminders", JSON.stringify(state));
      }
    },
  },
});

export const {
  addReminder,
  updateReminder,
  deleteReminder,
  toggleReminderComplete,
} = reminderSlice.actions;

export default reminderSlice.reducer;
