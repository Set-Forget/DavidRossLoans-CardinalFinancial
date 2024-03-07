import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { googleLogout } from "@react-oauth/google";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function UserSession() {
    const { user, setUser } = useContext(UserContext);

    const logOut = () => {
        googleLogout();
        localStorage.clear();
        setUser({ email: null });
    };

    return (
        <div className="flex h-16 shrink-0 items-center">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img
            alt="user"
            className="aspect-square h-full w-full"
            src={user.picture}
          />
        </span>
        <span className="ml-4 ml truncate text-sm font-semibold leading-6 text-white">
          {user.name}
        </span>
        <Popover className="relative">
          <Popover.Button onClick={handleClick} className="relative left-[4px] top-[2px]">
            <ChevronDownIcon className="h-6 w-6 ui-open:rotate-180 ui-open:transform" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 bg-white text-slate-700 p-3 rounded-lg right-0 w-52">
            <div className="grid grid-cols-1 truncate">
              <button
                className="flex items-center gap-3"
                onClick={logOut}
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    );
    function handleClick() {
        console.log("click");
    }
}
