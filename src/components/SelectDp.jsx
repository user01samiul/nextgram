function SelectDp({ name, handleChange, value }) {
  return (
    <label htmlFor="dp" className="flex flex-col w-full">
      <span className="mb-1">Select profile picture</span>
      <input
        // value={value} // don't need for type="file"
        type="file"
        id="dp"
        className="cursor-pointer"
        name={name}
        onChange={(e) => handleChange(e)} // Make sure handleChange is called correctly
      />
    </label>
  );
}
export default SelectDp;
