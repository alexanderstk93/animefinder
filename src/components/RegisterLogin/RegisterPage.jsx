import React from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router";
import UniversalForm from "./UniversalForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../store/usersSlice";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase-config";

export default function RegisterPage() {
  const navigate = useNavigate();

  

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <UniversalForm isForRegister />
      </div>
    </div>
  );
}
