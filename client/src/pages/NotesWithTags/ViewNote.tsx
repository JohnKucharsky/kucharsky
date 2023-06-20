import s from "./NotesWithTags.module.scss";
import { Button, Heading, Tag } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, pagesNames } from "../../helpers/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteNote, getNote, noteI } from "../../api/notes.api";
import ReactMarkdown from "react-markdown";
import { tagI } from "../../api/tags.api";
import { useTranslation } from "react-i18next";

export default function ViewNote() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { id } = useParams();
    const { t } = useTranslation("translation");

    const noteQuery = useQuery({
        queryKey: ["notes", id],
        queryFn: () => getNote(id),
        onError: (err: AxiosError) => {
            handleError(err, () => navigate(`/${pagesNames.login}`));
        },
        suspense: true,
    });

    const deleteNoteMutation = useMutation<
        AxiosResponse<noteI>,
        void,
        { id?: string }
    >({
        mutationFn: (body) => deleteNote(body.id),
        onSuccess: (data, params) => {
            queryClient.setQueryData<tagI[]>("notes", (notes) => {
                if (!notes) return [];
                return notes.filter((f) => f._id !== params.id);
            });
        },
    });

    const submitDeleteNote = async (body: { id?: string }) => {
        try {
            await deleteNoteMutation.mutateAsync(body);
            navigate(`/app/${pagesNames.notes_with_tags}`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={s.main}>
            <div
                style={{
                    gridTemplateColumns:
                        "max-content 1fr repeat(3, max-content)",
                }}
                className={s.top}
            >
                <Heading fontSize="3xl">{t("viewNote")}</Heading>

                <div />

                <Button
                    size="sm"
                    onClick={() =>
                        navigate(
                            `/app/${pagesNames.notes_with_tags}/edit/${id}`
                        )
                    }
                    colorScheme="blue"
                >
                    {t("edit")}
                </Button>

                <Button
                    size="sm"
                    onClick={() => submitDeleteNote({ id })}
                    colorScheme="blue"
                >
                    {t("delete")}
                </Button>

                <Button
                    onClick={() =>
                        navigate(`/app/${pagesNames.notes_with_tags}`)
                    }
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                >
                    {t("back")}
                </Button>
            </div>

            <div className={s.bottom_line}>
                <Heading fontSize="xl">{noteQuery.data?.title}</Heading>

                <div className={s.card_tags_wrapper}>
                    {noteQuery.data?.tags.map((tag) => (
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
            </div>

            <ReactMarkdown>{noteQuery.data?.markdown || ""}</ReactMarkdown>
        </div>
    );
}
