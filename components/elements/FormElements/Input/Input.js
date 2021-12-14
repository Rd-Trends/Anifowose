import React from "react";
import Style from "../../../../styles/Input.module.css";

const Input = ({
  type,
  placeholder,
  name,
  isRequired,
  inputRef,
  handleChange,
}) => {
  return (
    <>
      <input
        key={inputRef}
        className={Style.input}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        arial-label={name}
        required={isRequired}
        ref={inputRef}
      />
    </>
  );
};

export default Input;
