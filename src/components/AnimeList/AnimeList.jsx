import React from "react";
import styles from "./AnimeList.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AnimeItem from "../AnimeItem/AnimeItem";

export default function AnimeList() {
  const animesFound = useSelector((state) => state.anime.animesFound);
  const searchContent = useSelector((state) => state.anime.searchContent);

  const loadAnimesAsCards = () => {
    const animesAsItems = animesFound?.map((anime) => {
      return (
        <AnimeItem
          id={anime._id}
          key={anime._id}
          title={anime.title}
          img={anime.image}
          description={anime.synopsis}
        />
      );
    });

    return animesAsItems;
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{animesFound && loadAnimesAsCards()}</ul>
    </div>
  );
}
