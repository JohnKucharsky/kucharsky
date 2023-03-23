import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userProfileI } from "../api/profile";

let initialState: userProfileI = { user: null };

if (localStorage.getItem("profile")) {
    initialState = JSON.parse(localStorage.getItem("profile") || "{}");
}

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userProfileI | null>) => {
            const setInLs = (value: userProfileI | null) => {
                return localStorage.setItem(
                    "profile",
                    JSON.stringify({ user: value ? value.user : null })
                );
            };

            if (action.payload) {
                if (action.payload.user) {
                    state.user = action.payload.user;
                    setInLs(action.payload);
                } else {
                    state.user = null;
                    setInLs(null);
                }
            }
        },
    },
});

export const { setUser } = slice.actions;
export default slice.reducer;
