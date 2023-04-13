import { SyntheticEvent, useEffect } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    Select,
} from "@chakra-ui/react";
import { RxMagnifyingGlass } from "react-icons/rx";
import s from "./Books.module.scss";
import { useAppDispatch, useTypedSelector } from "../../redux/store";
import {
    booksSelector,
    categoriesType,
    getBooks,
    incrementBooks,
    incrementPage,
    relevanceType,
    setCategory,
    setQuery,
    setRelevance,
} from "../../redux/booksSlice";
import { useNavigate } from "react-router-dom";

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
    const { category, query, relevance, books, isLoading } =
        useTypedSelector(booksSelector);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = (e?: SyntheticEvent) => {
        e?.preventDefault();
        return dispatch(getBooks());
    };

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div className={s.main}>
            <div className={s.inputs_container}>
                {isLoading && (
                    <div className={s.progress_abs}>
                        <Progress size="xs" isIndeterminate />
                    </div>
                )}
                <form className={s.form_container} onSubmit={onSubmit}>
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
                            <InputRightElement>
                                <IconButton
                                    onClick={onSubmit}
                                    aria-label="search"
                                    size="sm"
                                    icon={
                                        <RxMagnifyingGlass
                                            fontSize={"1.4rem"}
                                            color="gray"
                                        />
                                    }
                                />
                            </InputRightElement>
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
                                dispatch(
                                    setCategory(
                                        e.target.value as categoriesType
                                    )
                                )
                            }
                            value={category}
                            placeholder="Category"
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
                                dispatch(
                                    setRelevance(
                                        e.target.value as relevanceType
                                    )
                                )
                            }
                            value={relevance}
                            placeholder="Order By"
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
                {books?.items.map((v) => (
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
                                src={v.volumeInfo?.imageLinks?.thumbnail || ""}
                                alt={v.volumeInfo?.title}
                                maxH={"10rem"}
                            />
                        </div>
                        <div></div>
                        <p className={s.card_text_gray_underline}>
                            {v.volumeInfo.categories?.[0] || "Unknown Category"}
                        </p>

                        <div className={s.card_text}>
                            <p>{v.volumeInfo.title} </p>
                        </div>

                        <div className={s.card_text_gray}>
                            <p>{v.volumeInfo.authors || "Unknown Author"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {books.totalItems > 0 || books.totalItems === books.items.length ? (
                <Button
                    width="8rem"
                    size="sm"
                    colorScheme="blue"
                    style={{
                        position: "absolute",
                        margin: "0.3rem auto 0 auto",
                        bottom: 0,
                        left: "50%",
                        transform: "translate(-50%,0)",
                    }}
                    onClick={() => {
                        dispatch(incrementPage());
                        dispatch(incrementBooks());
                    }}
                >
                    Load More
                </Button>
            ) : (
                <div></div>
            )}
        </div>
    );
}
