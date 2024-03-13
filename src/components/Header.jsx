import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserSession from "./user/UserSession";

const Header = ({ currentPage }) => {
    const { user } = useContext(UserContext);

    return (
        <header className="w-full h-[64px] px-16 py-3 flex justify-between border-b border-b-[#626262]/70">
            <div className="flex items-center justify-center">
                {user.email ? <h1>{currentPage}</h1> : <Logo />}
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

const Logo = () => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.18 26.5067L16.87 22.9833C11.83 24.43 6.60333 21.6067 5.13333 16.5667C3.66333 11.5267 6.51 6.30001 11.5267 4.83001C14.3033 4.03667 17.3133 4.50334 19.67 6.16001L23.1933 3.73334C17.57 -1.23666 9.03 -0.699994 4.08333 4.92334C-0.863333 10.5467 -0.42 19.0633 5.20333 24.0333C9.03 27.3933 14.42 28.3733 19.18 26.5067Z"
                fill="white"
            />
            <path
                d="M23.24 15.12L21.0933 16.5433L19.4367 14.07L23.03 11.6433L26.5533 9.28667C26.3433 8.56334 26.0167 7.86334 25.62 7.18667C25.5033 7.00001 25.41 6.79001 25.2467 6.60334C25.0367 6.23001 24.78 5.95001 24.5233 5.60001L21.1633 7.88667L13.4633 13.16L19.25 21.7L21.4667 24.9667C22.7033 24.1267 23.8233 23.0533 24.7333 21.8167L23.0067 19.3667L27.0667 16.4267C27.2067 15.5867 27.3233 14.7 27.3233 13.8133C27.3233 13.3467 27.2767 12.88 27.2533 12.4367L23.24 15.12Z"
                fill="#00B1A4"
            />
        </svg>
    );
};

export default Header;
