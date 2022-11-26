import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface LoggedUser {
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<LoggedUser | null>(null);

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const context = { logged, setLogged };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
