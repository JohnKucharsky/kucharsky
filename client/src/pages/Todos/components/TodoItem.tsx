import s from "../Todos.module.scss";
import CheckboxEl from "./CheckboxEl";
import { IconButton } from "@chakra-ui/react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { todoI } from "../../../api/todos.api";

export default function TodoItem({
    onChange,
    onDelete,
    todo,
}: {
    onChange: (e: boolean) => void;
    onDelete: () => void;
    todo: todoI;
}) {
    return (
        <div className={s.todo_container} key={todo._id}>
            <CheckboxEl
                onChange={(e) => onChange(e.target.checked)}
                finished={todo.finished}
                title={todo.todo}
            />
            <IconButton
                aria-label="Search database"
                size="sm"
                colorScheme="blue"
                onClick={onDelete}
                icon={<RiDeleteBin3Line fontSize="1.1rem" />}
            />
        </div>
    );
}
