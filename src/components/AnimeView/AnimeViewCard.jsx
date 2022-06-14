import React from "react";
import styles from "./AnimeViewCard.module.css";

export default function AnimeViewCard({
  title,
  ranking,
  img,
  description,
  episodes,
  genres,
  link,
  type,
  status,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={img} alt="" />
        <p className={styles.ranking}>Ranking: {ranking}</p>
        <p>Number of Episodes: {episodes}</p>
      </div>
      <div className={styles.rightSide}>
        <div className={styles["title-and-type"]}>
          <h2>{title}</h2>
          <p>Type: {type}</p>
          <p>Status: {status}</p>
        </div>
        <div className={styles.genres}>
          <p>Genres: {genres}</p>
        </div>
        <div className={styles.description}>
          <p>Description:</p>
          <p>{description}</p>
        </div>
        <p className={styles.linkContainer}>
          MyAnimeList: <a href={link}>{link}</a>
        </p>
      </div>
    </div>
  );
}
