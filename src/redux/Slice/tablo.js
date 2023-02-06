import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTabloData = createAsyncThunk(
  'users/fetchTabloData',
  async () => {
    const url = `https://e4e.newsystems.pl/admin/cross-rental/item-api`
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error(`Could not fetch, status: ${response.status}`)
    }
    return response.data
  }
)

export const fetchNewTabloData = createAsyncThunk(
  'users/fetchNewTabloData',
  async ({
    values: { country, town, category, subCategory },
    name,
    offset,
  }) => {
    const url = `https://e4e.newsystems.pl/admin/cross-rental/item-api?offset=${offset}&name=${name}&country=${country}&town=${town}&category=${category}&subCategory=${subCategory}`
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error(`Could not fetch, status: ${response.status}`)
    }
    return response.data
  }
)

// export const fetchSearchTabloName = createAsyncThunk(
//   'users/fetchSearchTabloName',
//   async (name) => {
//     const url = `https://e4e.newsystems.pl/admin/cross-rental/item-api?name=${name}`
//     const response = await axios.get(url)
//     if (response.status !== 200) {
//       throw new Error(`Could not fetch, status: ${response.status}`)
//     }
//     return response.data
//   }
// )

export const fetchFiltersTablo = createAsyncThunk(
  'users/fetchFiltersTablo',
  async ({
    values: { country, town, category, subCategory },
    name,
    offset,
  }) => {
    const url = `https://e4e.newsystems.pl/admin/cross-rental/item-api?offset=${offset}&name=${name}&country=${country}&town=${town}&category=${category}&subCategory=${subCategory}`
    const response = await axios.get(url)

    if (response.status !== 200) {
      throw new Error(`Could not fetch, status: ${response.status}`)
    }
    return response.data
  }
)

export const tabloProcess = {
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
}

const initialState = {
  homeTablo: [],
  isChatOpen: true,
  category: {},
  city: [],
  country: [],
  process: '',
  errors: null,
}

export const tabloSlice = createSlice({
  name: 'tablo',
  initialState,
  reducers: {
    setChat(state, action) {
      state.isChatOpen = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTabloData.pending, (state) => {
        state.homeTablo = []
        state.errors = null
        state.process = tabloProcess.LOADING
      })
      .addCase(fetchTabloData.fulfilled, (state, action) => {
        state.process = tabloProcess.SUCCESS
        state.homeTablo = [...action.payload.cross_renat]
        state.category = { ...action.payload.category }
        state.city = [...action.payload.city]
        state.country = [...action.payload.country]
      })
      .addCase(fetchTabloData.rejected, (state, action) => {
        state.homeTablo = []
        state.errors = action.error
        state.process = tabloProcess.ERROR
      })

      // fetchNewTabloData
      .addCase(fetchNewTabloData.pending, (state) => {
        state.errors = null
        state.process = tabloProcess.LOADING
      })
      .addCase(fetchNewTabloData.fulfilled, (state, action) => {
        state.process = tabloProcess.SUCCESS
        // if (action.payload.cross_renat == []) {
        //   state.homeTablo = []
        // }
        state.homeTablo = [...state.homeTablo, ...action.payload.cross_renat]
      })
      .addCase(fetchNewTabloData.rejected, (state, action) => {
        state.homeTablo = []
        state.errors = action.error
        state.process = tabloProcess.ERROR
      })

      // // fetchSearchTabloName
      // .addCase(fetchSearchTabloName.pending, (state) => {
      //   state.homeTablo = []
      //   state.errors = null
      //   state.process = tabloProcess.LOADING
      // })
      // .addCase(fetchSearchTabloName.fulfilled, (state, action) => {
      //   state.process = tabloProcess.SUCCESS
      //   state.homeTablo = [...action.payload.cross_renat]
      // // })
      // .addCase(fetchSearchTabloName.rejected, (state, action) => {
      //   state.homeTablo = []
      //   state.errors = action.error
      //   state.process = tabloProcess.ERROR
      // })

      // fetchFiltersTablo
      .addCase(fetchFiltersTablo.pending, (state) => {
        state.homeTablo = []
        state.errors = null
        state.process = tabloProcess.LOADING
      })
      .addCase(fetchFiltersTablo.fulfilled, (state, action) => {
        state.process = tabloProcess.SUCCESS
        state.homeTablo = [...action.payload.cross_renat]
      })
      .addCase(fetchFiltersTablo.rejected, (state, action) => {
        state.homeTablo = []
        state.errors = action.error
        state.process = tabloProcess.ERROR
      })
  },
})

export const { setChat } = tabloSlice.actions

export default tabloSlice.reducer
