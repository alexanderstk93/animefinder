import React from "react";
import Navbar from "../Header/Navbar";
import styles from "./Main.module.css";
import { useSelector } from "react-redux";
import AnimeList from "../AnimeList/AnimeList";
import LinearProgress from "@mui/material/LinearProgress";

export default function Main() {
  const animeFoundLength = useSelector((state) => state.anime.animesFound);
  const searchStatus = useSelector((state) => state.anime.searchStatus);
  const displayLoading = searchStatus ? "visible" : "hidden";

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h2>
          <i>
            {animeFoundLength.data &&
              `Results found: ${
                animeFoundLength.data && animeFoundLength.data?.length
              }`}
            {animeFoundLength.data?.length === 50 && " (Max)"}
          </i>
        </h2>

        <LinearProgress color="success" sx={{ visibility: displayLoading }} />

        <AnimeList />
      </div>
    </div>
  );
}
