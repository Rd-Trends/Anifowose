// import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Button = ({ children, handleClick, disabled, className, label }) => {
  return (
    <>
      <button
        aria-label={label ? label : ""}
        onClick={handleClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  disabled: PropTypes.bool,
};

export default Button;
