import { useState } from "react";
import {
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function Tag({
    label,
    onDelete,
    onUpdate,
}: {
    label: string;
    onDelete: () => void;
    onUpdate: (value: string) => void;
}) {
    const [updateTagValue, setUpdateTagValue] = useState(label);
    return (
        <InputGroup size="md">
            <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={
                    <AiOutlineArrowRight color="gray" fontSize="1.1rem" />
                }
            />

            <Input
                value={updateTagValue}
                onChange={(e) => {
                    setUpdateTagValue(e.target.value);
                    onUpdate(e.target.value);
                }}
                pr="2.5rem"
                type="text"
            />

            <InputRightElement width="2.5rem">
                <IconButton
                    aria-label="Search database"
                    size="xs"
                    colorScheme="blue"
                    type="submit"
                    onClick={onDelete}
                    icon={<RiDeleteBin3Line fontSize="1rem" />}
                />
            </InputRightElement>
        </InputGroup>
    );
}
