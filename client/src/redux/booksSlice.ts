import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types/book";
import { AppDispatch, RootState } from "./store";
import axios from "axios";

export type categoriesType =
    | "all"
    | "art"
    | "biography"
    | "computers"
    | "history"
    | "medical"
    | "poetry";

export type relevanceType = "newest" | "relevance";

const booksPayloadCreator = async (
    _: any,
    { dispatch, getState, rejectWithValue }: any
) => {
    const s = getState().books;

    try {
        const books = await axios.get<{
            items: Book[];
            totalItems: number;
        }>(
            "https://www.googleapis.com/books/v1/volumes" +
                import.meta.env.VITE_API_KEY,
            {
                params: {
                    q:
                        s.query +
                        `+subject:${s.category === "all" ? "" : s.category}`,
                    orderBy: s.relevance,
                    startIndex: s.page,
                    maxResults: 30,
                },
            }
        );

        return books.data;
    } catch (e: any) {
        console.error(e?.response);

        return rejectWithValue(e?.response);
    }
};

export const getBooks = createAsyncThunk<
    { items: Book[]; totalItems: number },
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>("books/getBooks", booksPayloadCreator);

export const incrementBooks = createAsyncThunk<
    { items: Book[]; totalItems: number },
    void,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>("books/incrementBooks", booksPayloadCreator);

interface initialStateI {
    books: { items: Book[]; totalItems: number };
    category: categoriesType;
    query: string;
    relevance: relevanceType;
    page: number;
    isLoading: boolean;
}

const initialState: initialStateI = {
    books: { items: [], totalItems: 0 },
    category: "all",
    query: "",
    relevance: "relevance",
    page: 0,
    isLoading: false,
};

const slice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<categoriesType>) {
            state.category = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setRelevance(state, action: PayloadAction<relevanceType>) {
            state.relevance = action.payload;
        },
        incrementPage(state) {
            state.page += 30;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;

                state.books = {
                    totalItems: action.payload.totalItems,
                    items: action.payload.items ? action.payload.items : [],
                };
            })
            .addCase(getBooks.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(incrementBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(incrementBooks.fulfilled, (state, action) => {
                state.isLoading = false;

                const allBooks = action.payload.items
                    ? [...state.books.items, ...action.payload.items]
                    : state.books.items;

                state.books = {
                    totalItems: action.payload.totalItems,
                    items: allBooks,
                };
            })
            .addCase(incrementBooks.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setCategory, setQuery, setRelevance, incrementPage } =
    slice.actions;
export default slice.reducer;
export const booksSelector = (state: RootState) => state.books;
