import { Link } from "react-router-dom";

import NotFound from "../assets/images/404.png";
import { routes } from "../routes/routes";

const PageNotFound = () => {
  return (
    <div className="w-full bg-day-bg-posts dark:bg-neutral-900 dark:text-neutral-200 py-16 flex flex-col justify-center items-center gap-8 sm:flex-row sm:h-[calc(100vh-82.5px)] sm:py-0 md:gap-16">
      <img src={NotFound} alt="" width={256} />
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-semibold sm:text-4xl">Przepraszamy!</h1>
        <p className="text-xs sm:text-sm text-center">
          Strona nie istnieje lub została usunięta.
        </p>
        <Link
          to={routes.start}
          className="bg-green-500 px-6 py-3 rounded-lg text-sm text-white scale-75 drop-shadow-button cursor-pointer transition-all text-center sm:scale-90 sm:hover:scale-95"
        >
          Wróć na stronę startową
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
