import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import { resetOn403 } from "../../shared/utils";

export default function Todos() {
    console.log("todos");

    useQuery({
        queryKey: "todos",
        queryFn: getTodos,
        onError: resetOn403,
    });

    return <></>;
}
