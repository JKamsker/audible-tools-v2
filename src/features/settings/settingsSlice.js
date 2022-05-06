import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        quality: 320,
        encodeEnabled: false,
        operatingSystem: 'win',
        outputFormat: 'm4b',
        outputName: 'keep',
    },
    reducers: {
        setQuality: (state, action) => {
            state.quality = action.payload;
        },
        enableEncode: (state, action) => {
            state.encodeEnabled = action.payload;
        },
        setOperatingSystem: (state, action) => {
            state.operatingSystem = action.payload;
        },
        setOutputFormat: (state, action) => {
            state.outputFormat = action.payload;
        },
        setOutputName: (state, action) => { 
            state.outputName = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = settingsSlice.actions
export const {
    setQuality,
    enableEncode,
    setOperatingSystem,
    setOutputFormat,
    setOutputName,
} = settingsSlice.actions

// export const act = settingsSlice.actions
export default settingsSlice.reducer