import { configureStore } from '@reduxjs/toolkit'
import memoryReducer from '@/redux/reducers/memoryGame'


export const store = configureStore({
    reducer: {
        memoryGame: memoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState> 