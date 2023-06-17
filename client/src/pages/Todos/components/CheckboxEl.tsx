import { ChangeEvent, useState } from "react";
import { Checkbox } from "@chakra-ui/react";

export default function CheckboxEl({
    onChange,
    finished,
    title,
}: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    finished: boolean;
    title: string;
}) {
    const [checked, setChecked] = useState(finished);

    return (
        <Checkbox
            spacing="1rem"
            isChecked={checked}
            onChange={(e) => {
                onChange(e);
                setChecked(e.target.checked);
            }}
            size="lg"
        >
            {title}
        </Checkbox>
    );
}
