import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createTodo,
    deleteTodo,
    getTodos,
    todoI,
    todoReqBodyI,
    updateTodo,
} from "../../api/todos.api";
import { handleError, pagesNames } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import {
    Button,
    FormControl,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import s from "./Todos.module.scss";
import { HiOutlineBriefcase } from "react-icons/hi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useState } from "react";
import CheckboxEl from "./components/CheckboxEl";

export default function Todos() {
    const [todoValue, setTodoValue] = useState("");

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const todosQuery = useQuery({
        queryKey: "todos",
        queryFn: getTodos,
        onError: (err: AxiosError) =>
            handleError(err, () => navigate(`/${pagesNames.login}`)),
        suspense: true,
    });

    const addTodoMutation = useMutation<
        AxiosResponse<todoI>,
        void,
        todoReqBodyI
    >({
        mutationFn: (body) => createTodo(body),
        onSuccess: (data) => {
            queryClient.setQueryData<todoI[]>("todos", (todos) => {
                if (!todos) return [];
                return [data.data, ...todos];
            });
        },
    });

    const updateTodoMutation = useMutation<
        AxiosResponse<todoI>,
        void,
        { body: todoReqBodyI; id: string }
    >({
        mutationFn: (body) => updateTodo(body.body, body.id),
        onSuccess: (data, params) => {
            queryClient.setQueryData<todoI[]>("todos", (todos) => {
                if (!todos) return [];
                const copy = [...todos];
                const changeIndex = todos.findIndex((f) => f._id === params.id);
                if (changeIndex !== -1) {
                    copy[changeIndex].finished = data.data.finished;
                }
                return copy;
            });
        },
    });

    const deleteTodoMutation = useMutation<
        AxiosResponse<todoI>,
        void,
        { id: string }
    >({
        mutationFn: (body) => deleteTodo(body.id),
        onSuccess: (data, params) => {
            queryClient.setQueryData<todoI[]>("todos", (todos) => {
                if (!todos) return [];
                return todos.filter((f) => f._id !== params.id);
            });
        },
    });

    const submitAddTodo = (body: todoReqBodyI) => {
        setTodoValue("");
        addTodoMutation.mutate(body);
    };

    return (
        <div className={s.main}>
            <Heading my="1.5rem" fontWeight={600} textAlign="center">
                ToDo List
            </Heading>

            <div className={s.content}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (todoValue.trim().length) {
                            submitAddTodo({
                                todo: todoValue,
                                finished: false,
                            });
                        }
                    }}
                >
                    <FormControl>
                        <InputGroup size="lg">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children={
                                    <HiOutlineBriefcase
                                        color="gray"
                                        fontSize="1.4rem"
                                    />
                                }
                            />

                            <Input
                                value={todoValue}
                                onChange={(e) => setTodoValue(e.target.value)}
                                pr="4.5rem"
                                type="text"
                                placeholder="ToDo"
                            />

                            <InputRightElement width="4.5rem">
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    type="submit"
                                    isDisabled={!todoValue.trim().length}
                                >
                                    Add
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </form>

                <div className={s.todos_container}>
                    {todosQuery.data?.map((todo) => (
                        <div className={s.todo_container} key={todo._id}>
                            <CheckboxEl
                                onChange={(e) =>
                                    updateTodoMutation.mutate({
                                        body: {
                                            todo: todo.todo,
                                            finished: e.target.checked,
                                        },
                                        id: todo._id,
                                    })
                                }
                                finished={todo.finished}
                                title={todo.todo}
                            />
                            <IconButton
                                aria-label="Search database"
                                size="sm"
                                colorScheme="blue"
                                onClick={() =>
                                    deleteTodoMutation.mutate({ id: todo._id })
                                }
                                icon={<RiDeleteBin3Line fontSize="1.1rem" />}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
