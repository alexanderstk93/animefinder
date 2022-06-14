import React from "react";
import { useLocation, useParams } from "react-router";
import styles from "./AnimeView.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AnimeViewCard from "./AnimeViewCard";

export default function AnimeView() {
  const params = useParams();
  const animesFound = useSelector((state) => state.anime.animesFound);

  const checkForAnime = () => {
    const searchAnimeById = animesFound.data?.filter(
      (animee) => animee._id === params.id
    );
    console.log(searchAnimeById);
    const animeAsCard = searchAnimeById?.map((anime) => (
      <AnimeViewCard
        title={anime.title}
        ranking={anime.ranking}
        img={anime.image}
        description={anime.synopsis}
        episodes={anime.episodes}
        genres={anime.genres}
        link={anime.link}
        type={anime.type}
        status={anime.status}
      />
    ));
    console.log(animeAsCard);
    return animeAsCard;
  };

  return (
    <div className={styles.container}>
      <h1 style={{ color: "cyan", fontStyle: "italic", marginBottom: "3rem" }}>
        Section under development
      </h1>
      <div className={styles.card} style={{ marginLeft: "5rem" }}>
        {checkForAnime()}
      </div>
    </div>
  );
}
