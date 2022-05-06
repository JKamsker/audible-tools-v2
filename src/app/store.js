import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from 'src/features/settings/settingsSlice'
import bookReducer from 'src/features/books/bookSlice'

export default configureStore({
  reducer: {
     settings: settingsReducer,
     books: bookReducer
  },
})