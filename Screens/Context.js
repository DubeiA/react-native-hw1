import { createContext, useContext, useState } from "react";

// export const DataContext = createContext(null);

const UserContext = createContext();

const registration = {
  login: "",
  email: "",
  password: "",
};

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(registration);

  const logIn = ({ login, email, password }) => {
    setIsLoggedIn(true);
    setUsername({ login, email, password });
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(registration);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
