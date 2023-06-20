import { useNavigate, useParams } from "react-router-dom";
import { setQuery } from "../../redux/booksSlice";
import { useAppDispatch } from "../../redux/store";
import { useQuery } from "react-query";
import s from "./Books.module.scss";
import { getBooks } from "../../api/books.api";
import { Button, Image, Link, Text } from "@chakra-ui/react";
import { Book } from "../../types/book";
import { useTranslation } from "react-i18next";

export default function BookDetails() {
    const { book_id } = useParams();

    const getBookQuery = useQuery({
        queryKey: ["books", book_id],
        queryFn: (q) => getBooks<Book>(q.queryKey[1] as string),
        suspense: true,
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation("translation");

    return (
        <div className={s.pos_rel}>
            <Button
                size="sm"
                colorScheme="blue"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
                onClick={() => {
                    navigate("/app/books");
                }}
            >
                {t("back")}
            </Button>
            <div className={s.book_details_container}>
                <Image
                    style={{
                        boxShadow: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
                    }}
                    src={
                        getBookQuery.data?.volumeInfo?.imageLinks?.thumbnail ||
                        ""
                    }
                    alt={getBookQuery.data?.volumeInfo?.title}
                />
                <div className={s.description_container}>
                    <Text fontSize="2xl">
                        {getBookQuery.data?.volumeInfo?.title}
                    </Text>

                    <Text fontSize="xl">
                        {getBookQuery.data?.volumeInfo?.subtitle}
                    </Text>

                    <div className={s.author_links}>
                        {getBookQuery.data?.volumeInfo?.authors?.map(
                            (author) => (
                                <Link
                                    onClick={() => {
                                        dispatch(setQuery(author));
                                        navigate("/app/books");
                                    }}
                                    colorScheme="teal"
                                    key={author}
                                >
                                    {author}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
