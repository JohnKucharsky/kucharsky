import s from "./NotesWithTags.module.scss";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    Modal,
    ModalContent,
    ModalOverlay,
    SimpleGrid,
    Tag,
    useDisclosure,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { handleError, pagesNames } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";
import { getTags } from "../../api/tags.api";
import EditTagsEl from "./components/EditTagsEl";
import { colourStyles } from "./NotesWithTags.service";
import { getNotes } from "../../api/notes.api";
import { useTranslation } from "react-i18next";

export default function NotesWithTags() {
    const [search, setSearch] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTags, setSelectedTags] = useState<
        { label: string; value: string }[]
    >([]);

    const navigate = useNavigate();
    const { t } = useTranslation("translation");

    const tagsQuery = useQuery({
        queryKey: "tags",
        queryFn: getTags,
        onError: (err: AxiosError) => {
            handleError(err, () => navigate(`/${pagesNames.login}`));
        },
        suspense: true,
    });

    const notesQuery = useQuery({
        queryKey: "notes",
        queryFn: getNotes,
        onError: (err: AxiosError) => {
            handleError(err, () => navigate(`/${pagesNames.login}`));
        },
    });

    return (
        <div className={s.main}>
            <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                    <EditTagsEl tags={tagsQuery.data} />
                </ModalContent>
            </Modal>

            <div className={s.top}>
                <Heading fontSize="3xl">{t("notes")}</Heading>

                <div />

                <Button
                    size="sm"
                    onClick={() =>
                        navigate(`/app/${pagesNames.notes_with_tags}/new`)
                    }
                    colorScheme="blue"
                >
                    {t("create")}
                </Button>

                <Button
                    onClick={onOpen}
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                >
                    {t("editTags")}
                </Button>
            </div>

            <div className={s.bottom_line}>
                <form>
                    <FormControl>
                        <FormLabel ml={1}>{t("search")}</FormLabel>
                        <InputGroup size="md">
                            <Input
                                variant="outline"
                                bg="#fff"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={`${t("search")}...`}
                            />
                        </InputGroup>
                    </FormControl>
                </form>

                <FormControl>
                    <FormLabel ml={1}>{t("orderBy")}</FormLabel>
                    <ReactSelect
                        value={selectedTags.map((tag) => {
                            return { label: tag.label, value: tag.value };
                        })}
                        options={tagsQuery.data?.map((tag) => {
                            return { label: tag.label, value: tag._id };
                        })}
                        onChange={(tags) => {
                            setSelectedTags(
                                tags.map((tag) => {
                                    return {
                                        label: tag.label,
                                        value: tag.value,
                                    };
                                })
                            );
                        }}
                        placeholder={`${t("tags")}...`}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 6,
                        })}
                        styles={colourStyles}
                        isMulti
                    />
                </FormControl>
            </div>

            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
                {notesQuery.data?.length ? (
                    notesQuery.data?.map((note) => (
                        <Card
                            cursor="pointer"
                            _hover={{
                                boxShadow:
                                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                            }}
                            onClick={() =>
                                navigate(
                                    `/app/${pagesNames.notes_with_tags}/view/${note._id}`
                                )
                            }
                            key={note._id}
                        >
                            <CardHeader>
                                <Heading size="md">{note.title}</Heading>
                            </CardHeader>

                            <CardFooter>
                                <div
                                    className={s.card_tags_wrapper}
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    {note.tags.map((tag) => (
                                        <Tag
                                            size="sm"
                                            key={`${tag._id}`}
                                            variant="subtle"
                                            colorScheme="cyan"
                                        >
                                            {tag.label}
                                        </Tag>
                                    ))}
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div>{t("noNotesPlaceholder")}</div>
                )}
            </SimpleGrid>
        </div>
    );
}
