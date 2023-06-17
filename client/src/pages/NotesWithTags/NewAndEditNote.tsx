import s from "./NotesWithTags.module.scss";
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    Textarea,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, pagesNames } from "../../shared/utils";
import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTags } from "../../api/tags.api";
import { AxiosError, AxiosResponse } from "axios";
import { colourStyles } from "./NotesWithTags.service";
import {
    createNote,
    getNote,
    noteI,
    noteReqBodyI,
    updateNote,
} from "../../api/notes.api";
import _ from "lodash";

export default function NewAndEditNote() {
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ["notes", id],
        queryFn: () => getNote(id),
        onError: (err: AxiosError) => {
            handleError(err, () => navigate(`/${pagesNames.login}`));
        },
        enabled: !!id,
        suspense: true,
    });

    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [selectedTags, setSelectedTags] = useState<
        { label: string; value: string }[]
    >([]);

    useEffect(() => {
        if (!id) return;
        setTitle(data?.title || "");
        setMarkdown(data?.markdown || "");
        setSelectedTags(
            data?.tags.map((tag) => {
                return {
                    label: tag.label,
                    value: tag._id,
                };
            }) || []
        );
    }, [data?.markdown, data?.tags, data?.title, id]);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const addNoteMutation = useMutation<
        AxiosResponse<noteI>,
        void,
        noteReqBodyI
    >({
        mutationFn: (body) => createNote(body),
        onSuccess: (data) => {
            queryClient.setQueryData<noteI[]>("tags", (note) => {
                if (!note) return [];
                return [data.data, ...note];
            });
        },
    });

    const updateNoteMutation = useMutation<
        AxiosResponse<noteI>,
        void,
        { body: noteReqBodyI; id?: string }
    >({
        mutationFn: (body) => updateNote(body.body, body.id),
        onSuccess: (data, params) => {
            queryClient.setQueryData<noteI[]>("notes", (notes) => {
                if (!notes) return [];

                const copy = [...notes];
                const changeIndex = notes.findIndex((f) => f._id === params.id);
                copy[changeIndex] = _.cloneDeep(data.data);
                return copy;
            });
        },
    });

    const tagsQuery = useQuery({
        queryKey: "tags",
        queryFn: getTags,
        onError: (err: AxiosError) => {
            handleError(err, () => navigate(`/${pagesNames.login}`));
        },
    });

    const submitAddNote = async () => {
        try {
            await addNoteMutation.mutateAsync({
                title: title || "",
                markdown: markdown || "",
                tags: selectedTags.map((tag) => tag.value),
            });
        } catch (e) {
            console.error(e);
        }
    };

    const submitEditNote = async () => {
        try {
            await updateNoteMutation.mutateAsync({
                id,
                body: {
                    title: title || "",
                    markdown: markdown || "",
                    tags: selectedTags.map((tag) => tag.value),
                },
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        (id ? submitEditNote() : submitAddNote())
            .then(() => {
                setMarkdown("");
                setTitle("");
                setSelectedTags([]);
                id
                    ? navigate(`/app/${pagesNames.notes_with_tags}/view/${id}`)
                    : navigate(`/app/${pagesNames.notes_with_tags}`);
            })
            .catch((e) => console.error(e));
    };

    return (
        <div className={s.main}>
            <div className={s.top}>
                <Heading fontSize="3xl">
                    {id ? "Edit Note" : "Create Note"}
                </Heading>

                <div />

                <Button size="sm" onClick={onSubmit} colorScheme="blue">
                    Save
                </Button>

                <Button
                    onClick={() =>
                        navigate(`/app/${pagesNames.notes_with_tags}`)
                    }
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                >
                    Back
                </Button>
            </div>

            <div className={s.bottom_line}>
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <FormLabel ml={1}>Title</FormLabel>
                        <InputGroup size="md">
                            <Input
                                variant="outline"
                                bg="#fff"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Note Title"
                            />
                        </InputGroup>
                    </FormControl>
                </form>
                <FormControl>
                    <FormLabel ml={1}>Select Tags</FormLabel>
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
                        placeholder="Tags..."
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 6,
                        })}
                        styles={colourStyles}
                        isMulti
                    />
                </FormControl>
            </div>

            <Textarea
                placeholder="Markdown text"
                size="lg"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                style={{
                    height: "15rem",
                }}
            />
        </div>
    );
}
