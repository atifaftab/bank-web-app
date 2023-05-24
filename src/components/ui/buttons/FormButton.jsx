//button used for simple clicks
//childern would be text which we pass eg: click,ok
const Button = (props) => {
  return (
    <button
      className={`bg-[#002D74] rounded-xl text-white py-3 hover:scale-105 duration-300 ${
        props.ondisabled && "opacity-50 cursor-not-allowed"
      }`}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.ondisabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
