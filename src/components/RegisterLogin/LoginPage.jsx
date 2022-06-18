import React from "react";
import styles from "./LoginPage.module.css";
import UniversalForm from "./UniversalForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <UniversalForm />
      </div>
    </div>
  );
}
