import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-[100dvh] bg-[#02293f] px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="bg-gradient-to-br text-white bg-clip-text text-4xl font-bold tracking-tight sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-400 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Page not found
                </h1>
              </div>
              <div className="mt-10 flex sm:border-l sm:border-transparent sm:pl-6">
                <Button
                  onClick={handleClick}
                >
                  Go back
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );

  function handleClick() {
    navigate(-1);
  }
}
