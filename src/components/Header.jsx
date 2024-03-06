import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserSession from "./user/UserSession";
import Image1 from "../assets/2.png";
import Image2 from "../assets/3.png";
import Image3 from "../assets/4.png";
import { Link } from "react-router-dom";
import { BASE_URL } from "../router";

const Header = () => {
    const { user } = useContext(UserContext);
    const { admin: isAdmin } = user;

    return (
        <header className="w-full px-8 py-3 flex justify-between bg-slate-700">
            <div className="flex items-center justify-center">
                <img
                    src={
                        "https://www.cardinalfinancial.com/wp-content/themes/cfstack/assets/images/logo_mark.svg"
                    }
                    alt="Logo"
                    className="w-10"
                />
                {user.email && (
                    <>
                        <Link className="ml-6 flex justify-center items-center gap-1" to={`${BASE_URL}home`}>
                            <img src={Image2} width={24} height={24} alt="Icon Home Value" />
                            <span className="whitespace-nowrap">Home Value</span>
                        </Link>
                        <Link
                            className="ml-4 flex justify-center items-center gap-1"
                            to="https://pdf-reader-chat.vercel.app/"
                        >
                            <img src={Image1} width={24} height={24} alt="Icon PDF ChatBot" />
                            <span className="whitespace-nowrap">PDF ChatBot</span>
                        </Link>
                        <Link
                            className="ml-4 flex justify-center items-center gap-1"
                            to={`${BASE_URL}calculator`}
                        >
                            <img src={Image3} width={24} height={24} alt="Icon Pricing Calculator" />
                            <span className="whitespace-nowrap">Pricing Calculator</span>
                        </Link>
                        {isAdmin && (
                            <>
                                <Link
                                    className="ml-6 flex justify-center items-center gap-1"
                                    to={`${BASE_URL}logs`}
                                >
                                    <img src={Image2} width={24} height={24} alt="Icon Home Value" />
                                    <span className="whitespace-nowrap">History Logs</span>
                                </Link>
                                <Link
                                    className="ml-6 flex justify-center items-center gap-1"
                                    to={`${BASE_URL}form`}
                                >
                                    <span className="whitespace-nowrap">1003 Form</span>
                                </Link>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
                {!user.email && (
                    <a
                        href="https://www.cardinalfinancial.com/loan-originator/david-ross/"
                        className="font-medium tracking-widetext-white p-1 hover:text-[#00B1A4]"
                    >
                        Contact us
                    </a>
                )}

                {user.email ? (
                    <span className="hidden lg:flex gap-4 items-center">
                        <UserSession />
                    </span>
                ) : null}
            </div>
            <div className="col-span-2 lg:hidden">{user.email ? <UserSession /> : null}</div>
        </header>
    );
};

export default Header;
