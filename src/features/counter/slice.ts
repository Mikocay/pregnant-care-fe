import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./stage";

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++
        },
        decrement: (state) => {
            state.value--
        },
        reset: (state) => {
            state.value = 0
        }
    },
})

export const { increment, decrement, reset } = counterSlice.actions
export default counterSlice.reducer