import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
    },
    reducers: {
        addBook: (state, action) => {
            state.items = [...state.items, action.payload];
        },
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
    // enableEncode, 
    // setOperatingSystem, 
    // setOutputFormat 
} = settingsSlice.actions

// export const act = settingsSlice.actions
export default settingsSlice.reducer