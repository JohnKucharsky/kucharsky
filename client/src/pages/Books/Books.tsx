import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Progress,
    Select,
} from "@chakra-ui/react";

import s from "./Books.module.scss";
import "../../assets/pagination.less";
import { useQuery } from "react-query";
import { categoriesType, getBooks, relevanceType } from "../../api/books.api";
import { Book } from "../../types/book";
import { useAppDispatch, useTypedSelector } from "../../redux/store";
import { setQuery } from "../../redux/booksSlice";
import Pagination from "rc-pagination";
import BooksListCards from "./components/BooksListCards";
import {
    categories,
    orderBy,
    paginationContainerStyles,
} from "./Books.service";

export default function BooksList() {
    const [category, setCategory] = useState<categoriesType>("all");
    const [relevance, setRelevance] = useState<relevanceType>("relevance");
    const [page, setPage] = useState(0);

    const { query } = useTypedSelector((s) => s.books);

    const dispatch = useAppDispatch();

    const books = useQuery({
        queryKey: ["books", query, category, relevance, page],
        queryFn: () =>
            getBooks<{
                items: Book[];
                totalItems: number;
            }>(query, category, relevance, page),
    });

    return (
        <div className={s.main}>
            <div className={s.inputs_container}>
                {books.isLoading && (
                    <div className={s.progress_abs}>
                        <Progress size="xs" isIndeterminate />
                    </div>
                )}

                <form className={s.form_container}>
                    <FormControl>
                        <FormLabel>Search</FormLabel>
                        <InputGroup size="lg">
                            <Input
                                variant="outline"
                                bg="#fff"
                                value={query}
                                onChange={(e) =>
                                    dispatch(setQuery(e.target.value))
                                }
                                placeholder="Pride and Prejudice"
                            />
                        </InputGroup>
                    </FormControl>
                </form>

                <div className={s.bottom_line}>
                    <FormControl>
                        <FormLabel>Categories</FormLabel>
                        <Select
                            bg="#fff"
                            variant="outline"
                            onChange={(e) =>
                                setCategory(e.target.value as categoriesType)
                            }
                            value={category}
                            size="lg"
                        >
                            {categories.map((v) => (
                                <option key={v} value={v}>
                                    {v[0].toUpperCase() + v.slice(1)}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Order By</FormLabel>
                        <Select
                            bg="#fff"
                            variant="outline"
                            onChange={(e) =>
                                setRelevance(e.target.value as relevanceType)
                            }
                            value={relevance}
                            size="lg"
                        >
                            {orderBy.map((v) => (
                                <option key={v} value={v}>
                                    {v[0].toUpperCase() + v.slice(1)}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <BooksListCards books={books.data} />

            <div style={paginationContainerStyles} onClick={() => null}>
                <div className={s.pagination_container}>
                    <Pagination
                        onChange={(page) => setPage(page)}
                        current={page}
                        total={books.data?.totalItems}
                    />
                </div>
            </div>
        </div>
    );
}
