import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Import your slice

const store = configureStore({
  reducer: {
    users: userReducer, // Add all your reducers here
  },
});

export default store;
