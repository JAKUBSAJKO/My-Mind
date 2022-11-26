import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UsersContextProvider } from "./contexts/context";
import { UserContextProvider } from "./contexts/test";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { routes } from "./routes/routes";

const App = () => {
  return (
    <Router>
      <UsersContextProvider>
        <UserContextProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path={routes.home} element={<Homepage />} />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.signUp} element={<SignUp />} />
            </Routes>
          </div>
        </UserContextProvider>
      </UsersContextProvider>
    </Router>
  );
};

export default App;
