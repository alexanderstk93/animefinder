import React from "react";
import styles from "./AnimeSuggested.module.css";
import { useNavigate } from "react-router";

export default function AnimeSuggested({ title, description, img, id }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/animeview/${id}`);
  };

  return (
    <div className={styles.container} onClick={onClickHandler}>
      <div className={styles.imageContainer}>
        <img src={img} alt="" />
      </div>
      <div className={styles["title-and-description"]}>
        <h5>{title}</h5>
        <p>{description?.slice(0, 150) + "(...)"}</p>
      </div>
    </div>
  );
}
