import { Link } from "react-router-dom";
import Input from "../../components/form/input/Input";
import useUserinput from "../../hooks/user-input";
import useHttp from "../../hooks/use-http";
import { signInUser } from "../../services/auth";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../../components/ui/buttons/FormButton";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const SignIn = () => {
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, data: userAuth, error } = useHttp(signInUser);
  useEffect(() => {
    if (status === "completed" && !error) {
      authCtx.login(userAuth.access_token);
    }
    if (status === "completed" && error) {
      console.log("error form here")
      alert(error);
    }
  }, [status, error, userAuth, authCtx]);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useUserinput(isEmail);

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useUserinput(isNotEmpty);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    sendRequest({
      email: enteredEmail,
      password: enteredPassword
    });

    resetPasswordInput();
    resetEmailInput();
  };
  return (
    <section className="bg-[url('/src/assets/blob-scatter-haikei.svg')] bg-cover bg-no-repeat bg-center  min-h-screen flex items-center justify-center">
      <div className="p-5 flex max-w-7xl  items-center md:w-4/5">
        <div className="md:block hidden w-1/2">
          <img
            className=" grayscale rounded-2xl mx-auto"
            src="https://images.unsplash.com/photo-1578670812003-60745e2c2ea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
          />
        </div>
        {/* form */}
        <div className="md:w-1/2 px-8 md:relative md:-left-[8rem] rounded-2xl shadow-lg py-5 bg-gray-100  md:px-16">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>
          <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              placeHolder="Email"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              value={enteredEmail}
              onError={emailInputHasError}
              invalidMsg={"please enter your correct email"}
            />
            <Input
              id="password"
              type="password"
              placeHolder="Password"
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              value={enteredPassword}
              onError={passwordInputHasError}
              invalidMsg={"please enter your password"}
            />
            <Button ondisabled={!formIsValid} type="submit">
              LOGIN
            </Button>
          </form>
          <div className="mt-3 text-sm flex justify-between items-center text-[#002D74]">
            <p>Don&rsquo;t have an account?</p>
            <Link
              to="/signup"
              className="py-3 px-6 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
