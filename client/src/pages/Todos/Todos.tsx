import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import { resetOn403 } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function Todos() {
    const navigate = useNavigate();

    useQuery({
        queryKey: "todos",
        queryFn: getTodos,
        onError: (err: AxiosError) => resetOn403(err, () => navigate("/login")),
    });

    return <></>;
}
