import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateI {
    query: string;
}

const initialState: initialStateI = {
    query: "",
};

const slice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
});

export const { setQuery } = slice.actions;
export default slice.reducer;
