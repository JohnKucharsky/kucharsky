import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
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
import { useTranslation } from "react-i18next";

export default function BooksList() {
    const [category, setCategory] = useState<categoriesType>("all");
    const [relevance, setRelevance] = useState<relevanceType>("relevance");
    const [page, setPage] = useState(0);

    const { query } = useTypedSelector((s) => s.books);

    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation("translation");

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
                <form className={s.form_container}>
                    <FormControl>
                        <FormLabel>{t("search")}</FormLabel>
                        <InputGroup size="lg">
                            <Input
                                variant="outline"
                                bg="#fff"
                                value={query}
                                onChange={(e) =>
                                    dispatch(setQuery(e.target.value))
                                }
                                placeholder={
                                    i18n.language === "en"
                                        ? "Pride and Prejudice"
                                        : "Война и Мир"
                                }
                            />
                        </InputGroup>
                    </FormControl>
                </form>

                <div className={s.bottom_line}>
                    <FormControl>
                        <FormLabel>{t("categories")}</FormLabel>
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
                                <option
                                    style={{
                                        textTransform: "capitalize",
                                    }}
                                    key={v}
                                    value={v}
                                >
                                    {t(v)}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("orderBy")}</FormLabel>
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
                                <option
                                    style={{
                                        textTransform: "capitalize",
                                    }}
                                    key={v}
                                    value={v}
                                >
                                    {t(v)}
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
