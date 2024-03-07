import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserSession from "./user/UserSession";

const Header = ({ currentPage }) => {
  const { user } = useContext(UserContext);

  return (
    <header className="w-full h-[64px] px-16 py-3 flex justify-between border-b border-b-[#626262]/70">
      <div className="flex items-center justify-center">
        {user.email ? (
          <h1>{currentPage}</h1>
        ) : (
          <img
            src={
              "https://www.cardinalfinancial.com/wp-content/themes/cfstack/assets/images/logo_mark.svg"
            }
            alt="Logo"
            className="w-10"
          />
        )}
      </div>
      <div className="flex gap-4 lg:flex-row items-center">
        {user.email ? (
          <UserSession />
        ) : (
          <a
            href="https://www.cardinalfinancial.com/loan-originator/david-ross/"
            className="font-medium tracking-widetext-white p-1 hover:text-[#00B1A4]"
          >
            Contact us
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
