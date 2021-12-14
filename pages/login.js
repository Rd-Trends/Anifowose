import React, { useState, useRef } from "react";
import Link from "next/link";
import { Input } from "../components/elements/FormElements/index";
import Layout from "../components/layout/index";
import { Button } from "../components/elements/Button/index";
import Style from "../styles/Login.module.css";
import buttonStyle from "../styles/Button.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = () => {
    setEmail(emailRef.current.value);
  };
  const handlePasswordChange = () => {
    setPassword(passwordRef.current.value);
  };

  const clearInput = () => {
    (emailRef.current.value = ""),
      (passwordRef.current.value = ""),
      setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = email;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res) {
      console.log(res);
      clearInput();
    }
  };

  return (
    <Layout>
      <div className={Style.wrapper}>
        <section className={Style.formWrapper}>
          <h1>Login</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className={Style.inputWrapper}>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                isRequired={true}
                handleChange={handleEmailChange}
                inputRef={emailRef}
              />
            </div>
            <div className={Style.inputWrapper}>
              <label htmlFor="Password">Password</label>
              <Input
                type="password"
                name="Password"
                placeholder="Password"
                isRequired={true}
                handleChange={handlePasswordChange}
                inputRef={passwordRef}
              />
            </div>

            <Button
              type="submit"
              className={buttonStyle.btn_primary}
              handleClick={handleSubmit}
            >
              Login
            </Button>
          </form>

          <p className={Style.loginLink}>
            Do not have an account?
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Login;
