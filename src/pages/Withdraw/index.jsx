import { useContext, useEffect } from "react";
import Button from "../../components/ui/buttons/FormButton";
import AuthContext from "../../context/auth-context";

import Input from "../../components/form/input/Input";
import useHttp from "../../hooks/use-http";
import useUserinput from "../../hooks/user-input";
import { transactionCredit } from "../../services/auth";
import Layout from "../../components/layout/Layout";

const isWithdrawValue = (value) =>
  !isNaN(value) && value.trim().length !== "" && value.trim() > 0;
const Withdraw = () => {
  const authCtx = useContext(AuthContext);

  const {
    sendRequest,
    status,
    data: userAuth,
    error,
  } = useHttp(transactionCredit);

  useEffect(() => {
    if (status === "completed" && !error) {
      console.log("Deposit succesful");
    }
    if (status === "completed" && error) {
      alert(error);
    }
  }, [status, error, userAuth]);

  const {
    value: enteredWithdraw,
    hasError: WithdrawInputHasError,
    isValid: enteredWithdrawIsValid,
    inputChangeHandler: WithdrawInputChangeHandler,
    inputBlurHandler: WithdrawInputBlurHandler,
    reset: resetWithdrawInput,
  } = useUserinput(isWithdrawValue);

  let formIsValid = false;

  if (enteredWithdrawIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    sendRequest(authCtx.userSessionId, parseInt(enteredWithdraw));

    resetWithdrawInput();
  };

  return (
    <Layout>
      <section className=" min-h-screen flex items-center justify-center">
        <div className="p-5 flex max-w-7xl md:max-w-3xl  items-center md:w-4/5">
          <div className="w-full px-8  rounded-2xl shadow-lg py-24 bg-gray-100  md:px-16">
            <h2 className="font-bold text-3xl text-[#002D74]">Withdraw</h2>

            <form
              onSubmit={formSubmitHandler}
              className="flex flex-col gap-4 mt-2"
            >
              <Input
                min="1"
                step="1"
                id="withdraw"
                type="number"
                placeHolder=" withdraw"
                onChange={WithdrawInputChangeHandler}
                onBlur={WithdrawInputBlurHandler}
                value={enteredWithdraw}
                onError={WithdrawInputHasError}
                invalidMsg={"please enter your  Withdraw"}
              />

              <Button ondisabled={!formIsValid} type="submit">
                Proceed
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Withdraw;
