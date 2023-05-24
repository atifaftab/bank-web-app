const Input = (props) => {
  return (
    <div className="mt-2">
      <input
        className={`w-full p-2 rounded-xl border ${
          props.onError && "border-red-500"
        }`}
        type={props.type}
        id={props.id}
        value={props.value}
        placeholder={props.placeHolder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        min={props.min ? props.min : ""}
        step={props.step ? props.step : ""}
      />
      {props.onError && (
        <p className="text-red-500 text-xs italic">{props.invalidMsg}</p>
      )}
    </div>
  );
};

export default Input;
