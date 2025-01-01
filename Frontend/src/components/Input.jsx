const Input = ({ placeholder, type, style }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border-[2px] border-white bg-zinc-700 text-white w-[95%] rounded-lg py-3 px-3 font-light outline-none ${style}`}
    />
  );
};

export default Input;
