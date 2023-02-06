import { configureStore } from '@reduxjs/toolkit'
import user from './Slice/user'
import tablo from './Slice/tablo'

export const store = configureStore({
  reducer: {
    user,
    tablo,
  },
})
