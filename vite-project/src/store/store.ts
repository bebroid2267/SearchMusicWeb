import { configureStore } from '@reduxjs/toolkit';
import albumSlice from './albumSlice';
import tracksSlice from './tracksSlice';
import playerSlice from './playerSlice';

const store = configureStore({
  reducer: {
    album: albumSlice,
    tracks: tracksSlice,
    player: playerSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;