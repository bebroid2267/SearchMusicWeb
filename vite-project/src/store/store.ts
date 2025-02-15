import { configureStore } from '@reduxjs/toolkit';
import albumSlice from './albumSlice';
import tracksSlice from './tracksSlice';
import playerSlice from './playerSlice';
import artistSlice from './artistSlice';
import userSlice from './userSlice';
import dataSlice from './searchDataSlice'

const store = configureStore({
  reducer: {
    album: albumSlice,
    tracks: tracksSlice,
    player: playerSlice,
    artist: artistSlice,
    user: userSlice,
    data: dataSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;