import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        progress: { value: 0, finished: true },
        items: [],
    },
    reducers: {
        addBook: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        updateProgress: (state, action) => {
            state.progress = action.payload;
        }
        // enableEncode: (state, action) => {
        //     state.encodeEnabled = action.payload;
        // },
        // setOperatingSystem: (state, action) => {
        //     state.operatingSystem = action.payload;
        // },
        // setOutputFormat: (state, action) => {
        //     state.outputFormat = action.payload;
        // }
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = settingsSlice.actions
export const { 
    addBook, 
    updateProgress,
} = booksSlice.actions

// export const act = settingsSlice.actions
export default booksSlice.reducer