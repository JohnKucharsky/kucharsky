import axios from "axios";
import { Book } from "../types/book";

export const getBook = async (query: string) => {
    const book = await axios.get<Book>(
        `https://www.googleapis.com/books/v1/volumes/${query}?key=${process.env.VITE_API_KEY}`
    );

    return book.data;
};
