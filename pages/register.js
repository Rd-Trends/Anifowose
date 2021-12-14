import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "../components/elements/FormElements";
import Layout from "../components/layout/index";
import { Button } from "../components/elements/Button/index";
import Style from "../styles/Login.module.css";
import buttonStyle from "../styles/Button.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const RepasswordRef = useRef(null);

  const clearInput = () => {
    (usernameRef.current.value = ""),
      (emailRef.current.value = ""),
      (RepasswordRef.current.value = "");
    passwordRef.current.value = "";
    setEmail("");
    setUsername("");
    setPassword("");
    setRePassword("");
  };

  const handleUsernameChange = () => {
    setUsername(usernameRef.current.value);
  };
  const handleEmailChange = () => {
    setEmail(emailRef.current.value);
  };
  const handlePasswordChange = () => {
    setPassword(passwordRef.current.value);
  };
  const handleREPasswordChange = () => {
    setRePassword(RepasswordRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (res) {
      console.log(res);
      clearInput();
    }
  };

  return (
    <Layout>
      <div className={Style.registerWrapper}>
        <section className={Style.formWrapper}>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className={Style.inputWrapper}>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="email"
                isRequired={true}
                inputRef={emailRef}
                handleChange={handleEmailChange}
              />
            </div>

            <div className={Style.inputWrapper}>
              <label htmlFor="Username">Username</label>
              <Input
                type="text"
                name="Username"
                placeholder="Username"
                isRequired={true}
                inputRef={usernameRef}
                handleChange={handleUsernameChange}
              />
            </div>
            <div className={Style.inputWrapper}>
              <label htmlFor="Password">Password</label>
              <Input
                type="password"
                name="Password"
                placeholder="Password"
                isRequired={true}
                inputRef={passwordRef}
                handleChange={handlePasswordChange}
              />
            </div>
            <div className={Style.inputWrapper}>
              <label htmlFor="confirm password">Confirm Password</label>
              <Input
                type="password"
                name="confirm password"
                placeholder="Password"
                isRequired={true}
                inputRef={RepasswordRef}
                handleChange={handleREPasswordChange}
              />
            </div>

            <Button
              type="submit"
              className={buttonStyle.btn_primary}
              handleClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>

          <p className={Style.loginLink}>
            already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Register;
