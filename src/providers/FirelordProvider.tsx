import { polls, teams } from "@/lib/firebase";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";

type ContextType = {
  polls: typeof polls;
  teams: typeof teams;
};

const Context = createContext<ContextType>({ polls, teams });

type FirelordProviderProps = {
  children?: ReactNode;
};

export const FirelordProvider: FunctionComponent<FirelordProviderProps> = ({
  children,
}) => {
  return (
    <Context.Provider value={{ polls, teams }}>{children}</Context.Provider>
  );
};

export const useFirelord = () => useContext(Context);
