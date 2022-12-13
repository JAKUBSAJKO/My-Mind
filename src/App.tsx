import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import { UsersContextProvider } from "./contexts/context";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MyProfil from "./pages/MyProfil";
import SignUp from "./pages/SignUp";
import Start from "./pages/Start";
import { routes } from "./routes/routes";

const App = () => {
  return (
    <Router>
      <UsersContextProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path={routes.start} element={<Start />} />
            <Route path={routes.home} element={<Homepage />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signUp} element={<SignUp />} />
            <Route path={routes.myProfil} element={<MyProfil />} />
            <Route path={routes.notFound} element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </UsersContextProvider>
    </Router>
  );
};

export default App;
