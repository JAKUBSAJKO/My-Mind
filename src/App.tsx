import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Spinner from "./components/Spinner";
import { UsersContextProvider } from "./contexts/context";
import { routes } from "./routes/routes";

const Start = lazy(() => import("./pages/Start"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Homepage = lazy(() => import("./pages/Homepage"));
const MyProfil = lazy(() => import("./pages/MyProfil"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Router>
      <UsersContextProvider>
        <div className={isDarkMode ? "dark" : ""}>
          <Suspense fallback={<Spinner isFull />}>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <Routes>
              <Route path={routes.start} element={<Start />} />
              <Route path={routes.home} element={<Homepage />} />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.signUp} element={<SignUp />} />
              <Route path={routes.myProfil} element={<MyProfil />} />
              <Route path={routes.notFound} element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Suspense>
        </div>
      </UsersContextProvider>
    </Router>
  );
};

export default App;
