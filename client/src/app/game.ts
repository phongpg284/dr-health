import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
    nth: number;
    totalScore: number;
    totalTime: number;
    gamePass: boolean[];
    gameTime: number[];
    gameId: string[];
}

const initialState: Game = {
    nth: 1,
    totalScore: 0,
    totalTime: 0,
    gamePass: [],
    gameTime: [],
    gameId: [],
}
export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateGame: (state, action: PayloadAction<Game>) => {
            (state.nth = action.payload.nth),
                (state.totalScore = action.payload.totalScore),
                (state.totalTime = action.payload.totalTime),
                (state.gamePass = action.payload.gamePass),
                (state.gameTime = action.payload.gameTime)
        },
        updateId: (state, action: PayloadAction<Game>) => {
            (state.gameId = action.payload.gameId)
        }
    },
});

export const { updateGame, updateId } = gameSlice.actions
export default gameSlice.reducer