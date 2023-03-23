import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function AppLayout() {
    return (
        <div className="app_layout_container">
            <Header />
            <Outlet />
        </div>
    );
}
