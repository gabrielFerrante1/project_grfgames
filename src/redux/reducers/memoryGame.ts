import { GameStatus, Level } from "@/types/Games";
import { Card } from "@/types/MemoryGame";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export const memoryGameReducer = createSlice({
    name: 'memoryGame',
    initialState: {
        selectedLevel: null as Level | null,
        flippedCards: [] as Card[],
        availableCards: [] as Card[],
        correctCards: [] as Card[],
        attempts: 0,
        attemptsMax: 10,
        gameStatus: 'playing' as GameStatus,
        showedEndScreen: false
    },
    reducers: {
        setSelectedLevel: (state, action: PayloadAction<Level | null>) => {
            state.selectedLevel = action.payload
        },
        setFlippedCards: (state, action: PayloadAction<Card[]>) => {
            state.flippedCards = action.payload
        },
        setAvailableCards: (state, action: PayloadAction<Card[]>) => {
            state.availableCards = action.payload
        },
        setCorrectCards: (state, action: PayloadAction<Card[]>) => {
            state.correctCards = action.payload
        },
        setAttempts: (state, action: PayloadAction<number>) => {
            state.attempts = action.payload
        },
        setAttemptsMax: (state, action: PayloadAction<number>) => {
            state.attemptsMax = action.payload
        },
        setGameStatus: (state, action: PayloadAction<GameStatus>) => {
            state.gameStatus = action.payload
        },
        setShowedEndScreen: (state, action: PayloadAction<boolean>) => {
            state.showedEndScreen = action.payload
        }
    }
})

export const {
    setSelectedLevel,
    setFlippedCards,
    setAvailableCards,
    setCorrectCards,
    setAttempts,
    setAttemptsMax,
    setGameStatus,
    setShowedEndScreen
} = memoryGameReducer.actions

export default memoryGameReducer.reducer
