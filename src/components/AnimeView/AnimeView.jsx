import React from "react";
import { useLocation, useParams } from "react-router";
import styles from "./AnimeView.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AnimeViewCard from "./AnimeViewCard";
import AnimeSuggested from "./AnimeSuggested";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";

export default function AnimeView() {
  const params = useParams();
  const animesFound = useSelector((state) => state.anime.animesFound);
  const [startFrom, setStartFrom] = useState(0);

  const checkForAnime = () => {
    const searchAnimeById = animesFound.data?.filter(
      (animee) => animee._id === params.id
    );

    if (!searchAnimeById || searchAnimeById.length === 0) {
      return <CircularProgress color="secondary" />;
    }

    const animeAsCard = searchAnimeById?.map((anime) => (
      <AnimeViewCard
        key={anime._id}
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

    return animeAsCard;
  };

  const loadSuggestedAnimes = () => {
    const filterAnimes = animesFound.data?.filter(
      (animee) => animee._id !== params.id
    );
    const transformToSuggestedCards = [];
    if (filterAnimes && startFrom < filterAnimes.length) {
      for (
        let i = startFrom;
        i <= startFrom + 3 && i < filterAnimes.length;
        i++
      ) {
        transformToSuggestedCards.push(
          <AnimeSuggested
            key={filterAnimes[i]._id}
            id={filterAnimes[i]._id}
            title={filterAnimes[i].title}
            description={filterAnimes[i].synopsis}
            img={filterAnimes[i].image}
          />
        );
      }
    }
    console.log(transformToSuggestedCards);
    return transformToSuggestedCards;
  };

  const changeStarter = (action) => {
    console.log(animesFound.data.length - 1);
    if (
      action === "increment" &&
      startFrom + 3 <= animesFound.data.length - 1
    ) {
      setStartFrom((state) => (state += 4));
    } else if (action === "decrement") {
      if (startFrom - 3 >= 0) {
        setStartFrom((state) => (state -= 4));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>{checkForAnime()}</div>
      <div className={styles.rightSide}>
        <div className={styles.controls}>
          <ArrowBackIosNewIcon
            className={styles.arrowLeft}
            sx={{ color: startFrom === 0 ? "grey" : "white", fontSize: "2rem" }}
            onClick={() => changeStarter("decrement")}
          />
          <ArrowForwardIosIcon
            className={styles.arrowRight}
            sx={{ color: "white", fontSize: "2rem" }}
            onClick={() => changeStarter("increment")}
          />
        </div>
        {loadSuggestedAnimes() || <CircularProgress color="secondary" />}
      </div>
    </div>
  );
}
