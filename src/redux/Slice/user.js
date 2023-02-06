import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserInfoByKey = createAsyncThunk(
  'users/fetchUserInfoByKey',
  async (userKey) => {
    const response = await axios.get(
      `https://cross-rental.newsystems.pl/admin/site/user?auth_key=${userKey}`
    )
    if (response.data.status === '212') {
      throw new Error(`Could not fetch, status: ${response.data.status}`)
    } else {
      return response.data[0][0]
    }
  }
)

export const userProcess = {
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
}

const initialState = {
  user: null,
  process: 'success',
  errors: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogoutUser(state) {
      state.user = null
      localStorage.removeItem('auth')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoByKey.pending, (state, action) => {
        state.user = null
        state.errors = null
        state.process = userProcess.LOADING
      })
      .addCase(fetchUserInfoByKey.fulfilled, (state, action) => {
        state.process = userProcess.SUCCESS
        state.user = action.payload
      })
      .addCase(fetchUserInfoByKey.rejected, (state, action) => {
        state.user = null
        state.errors = action.error
        state.process = userProcess.ERROR
      })
  },
})

export const { setLogoutUser } = userSlice.actions

export default userSlice.reducer
