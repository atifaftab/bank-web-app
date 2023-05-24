import React, { useState } from "react";
import { localStoragePrefix } from "../utils/GeneralConstant";

const AuthContext = React.createContext({
  userSessionId: "",
  isLoggedIn: false,
  // userData: {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialUserSessionId = localStorage.getItem(
    `${localStoragePrefix}userSessionId`
  );

  // let initialUserdata;

  // if (localStorage.getItem(`${localStoragePrefix}user`)) {
  //   initialUserdata = JSON.parse(
  //     localStorage.getItem(`${localStoragePrefix}user`)
  //   );
  // } else {
  //   initialUserdata = false;
  // }

  const [userSessionId, setUserSessionId] = useState(initialUserSessionId);
  // const [userData, setUserData] = useState(initialUserdata);

  const userIsLoggedIn = !!userSessionId;

  const logoutHandler = () => {
    setUserSessionId(null);
    // setUserData({});
    localStorage.removeItem(`${localStoragePrefix}userSessionId`);
    // localStorage.removeItem(`${localStoragePrefix}user`);
  };

  const loginHandler = (userSessionId) => {
    setUserSessionId(userSessionId);
    // setUserData(userData);
    console.log("-------------login handler--------------");
    // console.log(
    //   `token: ${userSessionId}, userName: ${userData.username}, email: ${userData.email} `
    // );
    localStorage.setItem(`${localStoragePrefix}userSessionId`, userSessionId);
    // localStorage.setItem(`${localStoragePrefix}user`, JSON.stringify(userData));
  };

  const contextValue = {
    userSessionId: userSessionId,
    isLoggedIn: userIsLoggedIn,
    // userData: userData,
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
