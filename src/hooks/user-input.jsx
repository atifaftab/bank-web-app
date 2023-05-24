import { useReducer } from "react";
// import { useState } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputSateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  if (action.type === "SET") {
    return { value: action.value, isTouched: false };
  }
  return initialInputState;
};
const useUserinput = (validateValue) => {
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);
  const [inputState, dispatch] = useReducer(
    inputSateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    // setIsTouched(true);
    dispatch({ type: "BLUR" });
  };

  const setValue = (enteredValue) => {
    dispatch({ type: "SET", value: enteredValue });
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
    setValue,
  };
};

export default useUserinput;
