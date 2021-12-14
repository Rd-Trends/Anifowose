import React from "react";
import Style from "../../../../styles/Input.module.css";

const Input = ({ inputRef, placeholder, name, isRequired, handleChange }) => {
  return (
    <>
      <textarea
        className={Style.textArea}
        onChange={handleChange}
        id={name}
        ref={inputRef}
        arial-label={name}
        name={name}
        placeholder={placeholder}
        required={isRequired}
      ></textarea>
    </>
  );
};

export default Input;
