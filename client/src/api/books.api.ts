import axios from "axios";

const booksApiAddress = "https://www.googleapis.com/books/v1/volumes";

const booksApiKey = "?key=AIzaSyAn45Kh9hlOxTKTnGS-bKTRh2jkr2FMvIw";

export type relevanceType = "newest" | "relevance";

export type categoriesType =
    | "all"
    | "art"
    | "biography"
    | "computers"
    | "history"
    | "medical"
    | "poetry";

export const getBooks = async <T>(
    query: string,
    category?: categoriesType,
    relevance?: relevanceType,
    page?: number
) => {
    const books = await axios.get<T>(
        `${booksApiAddress}/${!relevance ? query : ""}${booksApiKey}`,
        {
            params: relevance
                ? {
                      q: `${relevance ? query : ""}+subject:${
                          category === "all" ? "" : category
                      }`,
                      orderBy: relevance,
                      startIndex: page,
                      maxResults: 30,
                  }
                : undefined,
        }
    );

    return books.data;
};
