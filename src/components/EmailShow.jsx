function EmailShow({ title, type, name,handleChange, value, ...rest }) {
  return (
    <>
      <div className="relative my-4">
        <label htmlFor={name} className="flex flex-col ">
          <span className="mb-1">{title}</span>
          <input
            onChange={(e)=> handleChange(e)}
            type={type}
            name={name}
            value={value}
            id={name}
            disabled
            className={`text-white placeholder:text-[#575b61] p-2 focus:outline-none resize-none bg-[#313030]`}
            {...rest}
            placeholder={`Enter ${title}`}
          />
        </label>
      </div>
    </>
  );
}

export default EmailShow;
