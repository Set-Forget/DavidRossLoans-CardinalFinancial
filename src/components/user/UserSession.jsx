import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { googleLogout } from "@react-oauth/google";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Button from "../Button";

export default function UserSession() {
    const { user, setUser } = useContext(UserContext);

    const logOut = () => {
        googleLogout();
        localStorage.clear();
        setUser({ email: null });
    };

    return (
        <article className="flex-col text-sm flex items-start">
            <p>
                Logged In as <span className="font-bold"> {user.name} </span>
            </p>
            <Button className="text-red-600 gap-0.5" size="sm" variant="link" onClick={logOut}>
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                Logout
            </Button>
        </article>
    );
}
