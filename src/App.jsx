import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Fragment, useContext } from "react";
import AuthContext from "./context/auth-context";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";

const App = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Routes>
      {isLoggedIn && <Route path="/dashboard" element={<HomePage />} />}
      {isLoggedIn && (
        <Route path="/transaction/deposite" element={<Deposit />} />
      )}
      {isLoggedIn && (
        <Route path="/transaction/withdraw" element={<Withdraw />} />
      )}
      {!isLoggedIn && <Route path="/" element={<SignIn />} />}

      <Route path="/">
        <Route
          index
          element={
            <Fragment>
              {isLoggedIn && <Navigate to="/dashboard" replace={true} />}
              {!isLoggedIn && <SignIn />}
            </Fragment>
          }
        />
      </Route>
      {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
      {/* auth routes end */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
