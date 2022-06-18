import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UniversalForm.module.css";
import { database } from "../../firebase-config";
import { setIsLoggedIn, setUsername } from "../../store/userStatus";
import { useDispatch } from "react-redux";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UniversalForm({ isForRegister }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userStatus.isLoggedIn);
  if (isLoggedIn) navigate("/");

  const usersCollectionRef = collection(database, "users");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const handleRegisterForm = async () => {
    try {
      await addDoc(usersCollectionRef, {
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        isAdmin: false,

        created: Timestamp.now(),
      });
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };

  useEffect(() => {
    const q = query(usersCollectionRef);
    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot.docs);
      setUsers(
        querySnapshot.docs.map((user) => ({
          id: user.id,
          data: user.data(),
        }))
      );
    });
  }, []);

  const handleLoginForm = () => {
    const foundUser = users.filter(
      (user) =>
        user.data.username === usernameRef.current.value &&
        user.data.password === passwordRef.current.value
    );
    console.log(foundUser);
    if (foundUser.length === 1) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUsername(foundUser[0].data.username));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", foundUser[0].data.username);
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isForRegister ? "Register" : "Login"}</h2>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          isForRegister ? handleRegisterForm() : handleLoginForm();
        }}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            type="text"
            id="username"
            required
            minLength="4"
          />
        </div>
        <div
          className={styles.inputContainer}
          style={isForRegister ? { display: "flex" } : { display: "none" }}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            required
            minLength="10"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            required
            minLength="10"
          />
        </div>

        <button type="submit" className={styles.create}>
          {isForRegister ? "Create Account" : "Login"}
        </button>
        {!isForRegister && (
          <Link to="/register" onClick={() => navigate("/register")}>
            Register New Account
          </Link>
        )}
      </form>
    </div>
  );
}
