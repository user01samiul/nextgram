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
        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
      />
    </div>
  );
}

export default InputField;
