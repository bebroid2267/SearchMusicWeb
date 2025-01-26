import { configureStore } from '@reduxjs/toolkit';
import albumSlice, { ResultState } from './albumSlice';

const store = configureStore({
  reducer: {
    album: albumSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;