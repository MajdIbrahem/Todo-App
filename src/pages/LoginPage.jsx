import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { login } from "../store/actions/authActions";
import Button from "../components/Button";
import style from "../styles/modules/register.module.scss";
import { useMemo } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const loading = useSelector((state) => state.ui.loading);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const TitleComponent = useMemo(
    () => <h2 className={style.formTitle}>Login</h2>,
    []
  );

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    const inputData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (inputData.email.trim() === "") {
      setEmailError({ error: "Enter your email!" });
      return;
    }

    if (inputData.password.trim() === "" || inputData.password.length < 7) {
      setPasswordError({ error: "Password should be at lest 7 charter" });
      return;
    }
    dispatch(login(inputData));
  };
  return (
    <div className={style.page__wrapper}>
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        className={style.card}
      >
        <form className={style.form} onSubmit={submit}>
          {TitleComponent}
          <label htmlFor="email">
            Email
            <input
              className={emailError && style.error}
              ref={emailRef}
              type="email"
              id="email"
            />
            {emailError && <p>Enter your Email</p>}
          </label>
          <label style={{ marginBottom: "25px" }} htmlFor="password">
            Password
            <input
              className={passwordError && style.error}
              ref={passwordRef}
              id="password"
              type="password"
            />
            {passwordError && <p>{passwordError.error}</p>}
          </label>
          <Button
            style={{ padding: "0.8rem 5rem" }}
            type="submit"
            variant="primary"
            pending={loading}
          >
            Login
          </Button>
          <Link to="/register" className="link">
            <p className={style.navigate}>
              You don't have an account ? Register
            </p>
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
