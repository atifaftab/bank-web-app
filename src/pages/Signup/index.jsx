import { Link } from "react-router-dom";
import Button from "../../components/ui/buttons/FormButton";
import Input from "../../components/form/input/Input";
import useUserinput from "../../hooks/user-input";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { addUser } from "../../services/auth";
import DropDown from "../../components/form/dropdown/DropDown";
import { MyDatePicker } from "../../lib/DatePicker";
import { getDateFormate } from "../../utils/GeneralConstant";
// import { dropdown } from "../../components/form/"

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPhone = (value) => !isNaN(value) && value.trim().length !== "";
const isDepositValue = (value) =>
  !isNaN(value) && value.trim().length !== "" && value.trim() > 0;

const optaccType = [
  { label: "Savings", value: "savings" },
  { label: "Current", value: "current" },
];

const SignUp = () => {
  const [enteredOptDate, setEnteredOptDate] = useState(new Date());
  const { sendRequest, status, data: userAuth, error } = useHttp(addUser);

  useEffect(() => {
    if (status === "completed" && !error) {
      console.log("registration succesful");
    }
    if (status === "completed" && error) {
      alert(error);
    }
  }, [status, error, userAuth]);

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

  const {
    value: enteredFirstname,
    hasError: firstnameInputHasError,
    isValid: enteredFirstnameIsValid,
    inputChangeHandler: firstnameInputChangeHandler,
    inputBlurHandler: firstnameInputBlurHandler,
    reset: resetFirstName,
  } = useUserinput(isNotEmpty);

  const {
    value: enteredLastname,
    hasError: lastnameInputHasError,
    isValid: enteredLastnameIsValid,
    inputChangeHandler: lastnameInputChangeHandler,
    inputBlurHandler: lastnameInputBlurHandler,
    reset: resetLastnameInput,
  } = useUserinput(isNotEmpty);

  const isPasswordConfirm = (value) =>
    value.trim() !== "" && enteredPassword === value;

  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordInputHasError,
    isValid: enteredConfirmPasswordIsValid,
    inputChangeHandler: confirmPasswordInputChangeHandler,
    inputBlurHandler: confirmPasswordInputBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useUserinput(isPasswordConfirm);

  const {
    value: enteredContact,
    hasError: contactInputHasError,
    isValid: enteredContactIsValid,
    inputChangeHandler: contactInputChangeHandler,
    inputBlurHandler: contactInputBlurHandler,
    reset: resetContactInput,
  } = useUserinput(isPhone);

  const {
    value: enteredFirstDeposit,
    hasError: firstDepositInputHasError,
    isValid: enteredFirstDepositIsValid,
    inputChangeHandler: firstDepositInputChangeHandler,
    inputBlurHandler: firstDepositInputBlurHandler,
    reset: resetFirstDepositInput,
  } = useUserinput(isDepositValue);

  const {
    value: enteredAccountType,
    hasError: accountTypeInputHasError,
    isValid: enteredAccountTypeIsValid,
    inputChangeHandler: accountTypeInputChangeHandler,
    inputBlurHandler: accountTypeInputBlurHandler,
    reset: resetAccountTypeInput,
  } = useUserinput(isNotEmpty);

  const onDatePickerChange = (val) => {
    setEnteredOptDate(val);
  };

  let formIsValid = false;

  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredFirstnameIsValid &&
    enteredLastnameIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredContactIsValid &&
    enteredFirstDepositIsValid &&
    enteredAccountTypeIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const enteredDobDate = getDateFormate(enteredOptDate);

    sendRequest({
      firstname: enteredFirstname,
      lastname: enteredLastname,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      contactNo: enteredContact,
      dob: enteredDobDate,
      balance: enteredFirstDeposit,
      accountType: enteredAccountType,
    });

    resetPasswordInput();
    resetEmailInput();
    resetFirstName();
    resetLastnameInput();
    resetConfirmPasswordInput();
    resetContactInput();
    resetFirstDepositInput();
    resetAccountTypeInput();
  };
  return (
    <section className="bg-[url('/src/assets/blob-scatter-haikei.svg')] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      {/* login container */}
      <div className="p-5 flex max-w-7xl  items-center md:w-4/5">
        {/* image */}
        <div className="md:block hidden w-1/2">
          <img
            className="grayscale shadow-xl rounded-2xl mx-auto "
            src="https://images.unsplash.com/photo-1614267119077-51bdcbf9f77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
          />
        </div>
        {/* form */}
        <div className="md:w-1/2 px-8 md:relative md:-left-[8rem] rounded-2xl shadow-lg py-5 bg-gray-100  md:px-16">
          <h2 className="font-bold text-3xl text-[#002D74]">Register</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>
          <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                id="firstname"
                type="firstname"
                placeHolder="First Name"
                onChange={firstnameInputChangeHandler}
                onBlur={firstnameInputBlurHandler}
                value={enteredFirstname}
                onError={firstnameInputHasError}
                invalidMsg={"please enter your correct First Name"}
              />
              <Input
                id="lastname"
                type="lastname"
                placeHolder="Last Name"
                onChange={lastnameInputChangeHandler}
                onBlur={lastnameInputBlurHandler}
                value={enteredLastname}
                onError={lastnameInputHasError}
                invalidMsg={"please enter your Last Name"}
              />
            </div>
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
            <Input
              id="confirmPassword"
              type="password"
              placeHolder="Confirm Password"
              onChange={confirmPasswordInputChangeHandler}
              onBlur={confirmPasswordInputBlurHandler}
              value={enteredConfirmPassword}
              onError={confirmPasswordInputHasError}
              invalidMsg={"please confirm your correct password"}
            />
            <Input
              id="contact"
              type="tel"
              placeHolder="Contact Number"
              onChange={contactInputChangeHandler}
              onBlur={contactInputBlurHandler}
              value={enteredContact}
              onError={contactInputHasError}
              invalidMsg={"please enter your correct contact number"}
            />
            <MyDatePicker
              label="Birthday"
              id="Birthday"
              onChange={onDatePickerChange}
              currentDate={enteredOptDate}
            />
            <div className="flex gap-2">
              <Input
                min="1"
                step="1"
                id="firstDeposit"
                type="number"
                placeHolder="First Deposit"
                onChange={firstDepositInputChangeHandler}
                onBlur={firstDepositInputBlurHandler}
                value={enteredFirstDeposit}
                onError={firstDepositInputHasError}
                invalidMsg={"please enter only numbers"}
              />
              {/* <Input
                id="accountType"
                type="dropdown"
                placeHolder="AccountType"
                onChange={accountTypeInputChangeHandler}
                onBlur={accountTypeInputBlurHandler}
                value={enteredAccountType}
                onError={accountTypeInputHasError}
                // invalidMsg={"please enter your password"}
              /> */}
              <DropDown
                id="accountType"
                placeHolder="Account Type"
                options={optaccType}
                onChange={accountTypeInputChangeHandler}
                onBlur={accountTypeInputBlurHandler}
                value={enteredAccountType}
                onError={accountTypeInputHasError}
                invalidMsg={"Mandatory Field."}
              />
            </div>

            <Button ondisabled={!formIsValid} type="submit">
              REGISTER
            </Button>
          </form>

          <div className="mt-3 text-sm flex justify-between items-center text-[#002D74]">
            <p>Already member?</p>
            <Link
              to="/"
              className="py-3 px-6 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
