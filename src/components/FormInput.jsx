import { useEffect, useRef, useState } from "react";

function Input({ title, type, name, handleChange,value, ...rest }) {
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(null); // Ref for the input element

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Click occurred outside of the input field
        setEditable(false);
      }
    }

    // Add event listener to detect clicks outside of the input field
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEditable() {
    setEditable((prev) => !prev);
  }

  return (
    <>
      <div className="relative my-4">
        <label htmlFor={name} className="flex flex-col ">
          <span className="mb-1">{title}</span>
          <input
            onChange={(e) => handleChange(e)}
            value={value}
            ref={inputRef} // Assign the ref to the input element
            type={type}
            name={name}
            id={name}
            disabled={!editable}
            className={`text-white placeholder:text-[#575b61] p-2 focus:outline-none resize-none ${
              !editable ? "bg-[#313030]" : "bg-[#131313]"
            }`}
            {...rest}
            placeholder={`Enter ${title}`}
          />
        </label>
        {!editable ? (
          <button
            className="absolute right-0 text-xs my-1 text-blue-500 cursor-pointer"
            onClick={handleEditable}
            type="button"
          >
            {editable ? `Save` : `Edit ${title}`}
          </button>
        ) : (
          <span className="absolute right-0 text-xs my-1 text-blue-500 cursor-pointer">
            Save
          </span>
        )}
      </div>
    </>
  );
}

export default Input;
