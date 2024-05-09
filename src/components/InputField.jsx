function InputField({
  title,
  type,
  name,
  placeholder,
  value,
  handleChange,
  ...rest
}) {
  return (
    <div className="w-full my-2">
      <label htmlFor={name}>
        <p className="mb-[2px] text-[15px] font-normal">{title}</p>
      </label>
      <input
        {...rest}
        value={value}
        name={name}
        type={type}
        id={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-80% bg-[#f5f7ff] px-2  h-[40px] focus:outline-none w-full text-black"
      />
    </div>
  );
}

export default InputField;
