const DropDown = (props) => {
  return (
    <div className="mt-2 w-3/6">
      <select
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className={`border border-gray-200 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
          props.onError && "border-red-500"
        }`}
      >
        <option value={""}>{props?.placeHolder}</option>

        {props?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {props.onError && (
        <p className="text-red-500 text-xs italic">{props.invalidMsg}</p>
      )}
    </div>
  );
};

export default DropDown;
