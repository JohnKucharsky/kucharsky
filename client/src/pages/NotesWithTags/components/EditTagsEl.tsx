import { useState } from "react";

import { useMutation, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";
import {
    createTag,
    deleteTag,
    tagI,
    tagReqBodyI,
    updateTag,
} from "../../../api/tags.api";
import s from "../NotesWithTags.module.scss";
import {
    Box,
    Button,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineTags } from "react-icons/ai";
import { debounce } from "lodash";
import Tag from "./Tag";
import { useTranslation } from "react-i18next";
import { rightInputElEnum, widthRightInputEl } from "../../../helpers/utils";

export default function EditTagsEl({ tags }: { tags: tagI[] | undefined }) {
    const [tagValue, setTagValue] = useState("");

    const queryClient = useQueryClient();
    const { t } = useTranslation("translation");

    const addTagMutation = useMutation<AxiosResponse<tagI>, void, tagReqBodyI>({
        mutationFn: (body) => createTag(body),
        onSuccess: (data) => {
            queryClient.setQueryData<tagI[]>("tags", (tags) => {
                if (!tags) return [];
                return [data.data, ...tags];
            });
        },
    });

    const updateTagMutation = useMutation<
        AxiosResponse<tagI>,
        void,
        { body: tagReqBodyI; id: string }
    >({
        mutationFn: (body) => updateTag(body.body, body.id),
        onSuccess: (data, params) => {
            queryClient.setQueryData<tagI[]>("tags", (tags) => {
                if (!tags) return [];
                const copy = [...tags];
                const changeIndex = tags.findIndex((f) => f._id === params.id);
                copy[changeIndex].label = data.data.label;
                return copy;
            });
        },
    });

    const deleteTagMutation = useMutation<
        AxiosResponse<tagI>,
        void,
        { id: string }
    >({
        mutationFn: (body) => deleteTag(body.id),
        onSuccess: (data, params) => {
            queryClient.setQueryData<tagI[]>("tags", (tags) => {
                if (!tags) return [];
                return tags.filter((f) => f._id !== params.id);
            });
        },
    });

    const submitAddTag = (body: tagReqBodyI) => {
        setTagValue("");
        addTagMutation.mutate(body);
    };

    const debounceOnChange = debounce(
        (value: string, id: string) =>
            updateTagMutation.mutate({
                body: {
                    label: value,
                },
                id,
            }),
        500
    );

    return (
        <div className={s.main_container}>
            <Box mt="0.5rem" mb="1.5rem">
                <Heading fontSize="2xl" textAlign="center">
                    {t("tags")}
                </Heading>
            </Box>

            <div className={s.content}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (tagValue.trim().length) {
                            await submitAddTag({
                                label: tagValue,
                            });
                        }
                    }}
                >
                    <FormControl>
                        <InputGroup size="md">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children={
                                    <AiOutlineTags
                                        color="gray"
                                        fontSize="1.4rem"
                                    />
                                }
                            />

                            <Input
                                value={tagValue}
                                onChange={(e) => setTagValue(e.target.value)}
                                pr={widthRightInputEl(rightInputElEnum.tags)}
                                type="text"
                                placeholder={t("tags")}
                            />

                            <InputRightElement
                                width={widthRightInputEl(rightInputElEnum.tags)}
                            >
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    type="submit"
                                    isDisabled={!tagValue.trim().length}
                                >
                                    {t("add")}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </form>

                <div className={s.tags_container}>
                    {tags?.map((tag) => (
                        <Tag
                            key={tag._id}
                            onDelete={() =>
                                deleteTagMutation.mutate({ id: tag._id })
                            }
                            label={tag.label}
                            onUpdate={(value) =>
                                debounceOnChange(value, tag._id)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
