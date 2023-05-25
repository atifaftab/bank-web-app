import React, { useState } from "react";
import { localStoragePrefix } from "../utils/GeneralConstant";

const AuthContext = React.createContext({
  userSessionId: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialUserSessionId = localStorage.getItem(
    `${localStoragePrefix}userSessionId`
  );

  const [userSessionId, setUserSessionId] = useState(initialUserSessionId);
  const userIsLoggedIn = !!userSessionId;

  const logoutHandler = () => {
    setUserSessionId(null);
    localStorage.removeItem(`${localStoragePrefix}userSessionId`);
  };

  const loginHandler = (userSessionId) => {
    setUserSessionId(userSessionId);
    localStorage.setItem(`${localStoragePrefix}userSessionId`, userSessionId);
  };

  const contextValue = {
    userSessionId: userSessionId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
