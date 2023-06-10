import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Image,
    Input,
    InputGroup,
    Progress,
    Select,
} from "@chakra-ui/react";

import s from "./Books.module.scss";
import "../../assets/pagination.less";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { categoriesType, getBooks, relevanceType } from "../../api/books.api";
import { Book } from "../../types/book";
import { useAppDispatch, useTypedSelector } from "../../redux/store";
import { setQuery } from "../../redux/booksSlice";
import Pagination from "rc-pagination";

const categories = [
    "all",
    "art",
    "biography",
    "computers",
    "history",
    "medical",
    "poetry",
];
const orderBy = ["newest", "relevance"];

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

    const navigate = useNavigate();

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

            {/* Cards */}
            <div className={s.books_container}>
                {books.data?.items?.length ? (
                    Array.from(
                        new Map(
                            books.data?.items?.map((item) => [item["id"], item])
                        ).values()
                    )?.map((v) => (
                        <div
                            onClick={() => {
                                navigate(`/app/books/${v.id}`);
                            }}
                            className={s.book_card}
                            key={v.id}
                        >
                            <div className={s.image_con}>
                                <Image
                                    style={{
                                        boxShadow: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
                                    }}
                                    src={
                                        v.volumeInfo?.imageLinks?.thumbnail ||
                                        ""
                                    }
                                    alt={v.volumeInfo?.title}
                                    maxH={"10rem"}
                                />
                            </div>
                            <div></div>
                            <p className={s.card_text_gray_underline}>
                                {v.volumeInfo.categories?.[0] ||
                                    "Unknown Category"}
                            </p>

                            <div className={s.card_text}>
                                <p>{v.volumeInfo.title} </p>
                            </div>

                            <div className={s.card_text_gray}>
                                <p>
                                    {v.volumeInfo.authors || "Unknown Author"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No results</div>
                )}
            </div>

            <div
                style={{
                    position: "absolute",
                    margin: "0.3rem auto 0 auto",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-50%,0)",
                }}
                onClick={() => null}
            >
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
