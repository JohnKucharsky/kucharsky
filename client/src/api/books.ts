import axios from "axios";
import { Book } from "../types/book";

export const getBook = async (query: string) => {
    const book = await axios.get<Book>(
        `https://www.googleapis.com/books/v1/volumes/${query}?key=AIzaSyAn45Kh9hlOxTKTnGS-bKTRh2jkr2FMvIw`
    );

    return book.data;
};
