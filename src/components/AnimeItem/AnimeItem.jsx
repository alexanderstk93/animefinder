import React from "react";
import styles from "./AnimeItem.module.css";
import { useNavigate } from "react-router-dom";

export default function AnimeItem({
  title,
  img,
  description,
  mostPopular,
  id,
}) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/animeview/${id}`);
  };

  return (
    <li className={styles.container} onClick={onClickHandler}>
      <div className={styles.content}>
        <img src={img} alt="" />
        <div className={styles.details}>
          <h3>{title}</h3>
          <p>
            {description.length > 130
              ? description.slice(0, 120) + "(...)"
              : description}
          </p>
        </div>
      </div>
    </li>
  );
}
