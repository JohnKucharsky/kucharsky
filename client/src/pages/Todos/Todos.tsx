import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createTodo,
    deleteTodo,
    getTodos,
    todoI,
    todoReqBodyI,
    updateTodo,
} from "../../api/todos.api";
import {
    handleError,
    pagesNames,
    rightInputElEnum,
    widthRightInputEl,
} from "../../helpers/utils";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import {
    Button,
    Collapse,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useDisclosure,
} from "@chakra-ui/react";
import s from "./Todos.module.scss";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TodoItem from "./components/TodoItem";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Todos() {
    const [todoValue, setTodoValue] = useState("");
    const { isOpen, onToggle } = useDisclosure();

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { t } = useTranslation("translation");

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

    const delTodo = (id: string) => {
        deleteTodoMutation.mutate({ id });
    };

    const completeTodo = (id: string, finished: boolean, todo: string) => {
        updateTodoMutation.mutate({
            body: {
                todo,
                finished,
            },
            id,
        });
    };

    const completedTodos = todosQuery.data?.filter((todo) => todo.finished);
    const todoTodos = todosQuery.data?.filter((todo) => !todo.finished);

    return (
        <div className={s.main}>
            <Heading my="1.5rem" fontWeight={600} textAlign="center">
                {t("toDoList")}
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
                                pr={widthRightInputEl(rightInputElEnum.todos)}
                                type="text"
                                placeholder={t("toDo")}
                            />

                            <InputRightElement
                                width={widthRightInputEl(
                                    rightInputElEnum.todos
                                )}
                            >
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    type="submit"
                                    isDisabled={!todoValue.trim().length}
                                >
                                    {t("add")}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </form>

                <div className={s.todos_container}>
                    {todoTodos?.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            onChange={(checked) =>
                                completeTodo(todo._id, checked, todo.todo)
                            }
                            onDelete={() => delTodo(todo._id)}
                            todo={todo}
                        />
                    ))}
                    {completedTodos?.length ? (
                        <Button
                            onClick={onToggle}
                            width="12rem"
                            colorScheme="blue"
                            rightIcon={
                                isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />
                            }
                        >
                            Completed Todos
                        </Button>
                    ) : null}
                    <Collapse in={isOpen} animateOpacity>
                        {completedTodos?.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                onChange={(checked) =>
                                    completeTodo(todo._id, checked, todo.todo)
                                }
                                onDelete={() => delTodo(todo._id)}
                                todo={todo}
                            />
                        ))}
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
