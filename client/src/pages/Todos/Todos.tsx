import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import { resetOn403 } from "../../shared/utils";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getMe } from "../../api/profile";

export default function Todos() {
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);

    useQuery({
        queryKey: "todos",
        queryFn: getTodos,
        onError: (err: AxiosError) => resetOn403(err, () => navigate("/login")),
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                setData(await getMe());
            } catch (e) {
                console.log(e);
            }
        };

        fetch();
    }, []);

    return <>{JSON.stringify(data)}</>;
}
