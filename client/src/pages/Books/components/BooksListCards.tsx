import s from "../Books.module.scss";
import { Box, Image, Text, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../types/book";
import BooksSkeleton from "../../../skeletons/BooksSkeleton";
import { tooltipHelper } from "../../../helpers/utils";

export default function BooksListCards({
    books,
}: {
    books: { items: Book[]; totalItems: number } | undefined;
}) {
    const navigate = useNavigate();

    return (
        <div className={s.books_container}>
            {books?.items?.length ? (
                Array.from(
                    new Map(
                        books?.items?.map((item) => [item["id"], item])
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
                                src={v.volumeInfo?.imageLinks?.thumbnail || ""}
                                alt={v.volumeInfo?.title}
                                maxH={"10rem"}
                            />
                        </div>

                        <div></div>

                        <Box mb="0.3rem">
                            <Tooltip
                                label={tooltipHelper(
                                    20,
                                    v.volumeInfo.categories?.[0]
                                )}
                            >
                                <Text
                                    decoration="underline"
                                    fontSize="md"
                                    color="gray.600"
                                    noOfLines={1}
                                >
                                    {v.volumeInfo.categories?.[0] ||
                                        "Unknown Category"}{" "}
                                </Text>
                            </Tooltip>
                        </Box>

                        <Tooltip label={tooltipHelper(40, v.volumeInfo.title)}>
                            <Text fontSize="md" noOfLines={2}>
                                {v.volumeInfo.title}
                            </Text>
                        </Tooltip>

                        <Tooltip
                            label={tooltipHelper(20, v.volumeInfo.authors?.[0])}
                        >
                            <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                {v.volumeInfo.authors?.[0] || "Unknown Author"}
                            </Text>
                        </Tooltip>
                    </div>
                ))
            ) : (
                <>
                    {Array.from(Array(16).keys()).map((sk) => (
                        <div
                            style={{
                                height: "100%",
                            }}
                            key={sk}
                            className={s.book_card}
                        >
                            <BooksSkeleton />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
