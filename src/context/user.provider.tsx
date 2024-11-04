"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TUser } from "../types";
import { currentUser } from "../Services/AuthService";

const UserContext = createContext<IUserProvidersValue | undefined>(undefined);
interface IUserProvidersValue {
  user: TUser | null;
  setuser: (user: TUser | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await currentUser();
    setuser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, [isLoading]);
  return (
    <UserContext.Provider value={{ isLoading, user, setuser, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("user provider context");
  }
  return context;
};
