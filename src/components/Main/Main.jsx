import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import styles from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import AnimeList from "../AnimeList/AnimeList";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef } from "react";
import { setSelect } from "../../store/animeSlice";
export default function Main() {
  const animeFoundLength = useSelector((state) => state.anime.animesFound);

  const searchStatus = useSelector((state) => state.anime.searchStatus);

  const displayLoading = searchStatus ? "visible" : "hidden";

  const selectRef = useRef(null);

  const dispatch = useDispatch();

  const selectContent = useSelector((state) => state.anime.selectContent);

  const selectHandler = (e) => {
    if (selectRef.current.value === "none") {
      dispatch(setSelect(""));
    } else {
      dispatch(setSelect(selectRef.current.value));
    }
  };

  const jumptTopHandler = () => {
    window.scrollTo(0, 0);
  };

  const currentWindowHeight = useSelector(
    (state) => state.userStatus.windowHeight
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.genreContainer}>
          <p>Genre: </p>
          <select
            ref={selectRef}
            onChange={selectHandler}
            defaultValue={selectContent}
          >
            <option value="none">None</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Slice of Life">Slice of Life</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Magic">Magic</option>
            <option value="Supernatural">Supernatural</option>
            <option value="Psychological">Psychological</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Cyberpunk">Cyberpunk</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <h2>
          <i>
            {animeFoundLength &&
              `Results found: ${animeFoundLength && animeFoundLength?.length}`}
            {animeFoundLength?.length === 50 && " (Max)"}
          </i>
        </h2>

        <LinearProgress color="success" sx={{ visibility: displayLoading }} />

        <AnimeList />

        <button
          onClick={jumptTopHandler}
          className={styles.jumpTop}
          style={
            currentWindowHeight > 500
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Jump Top
        </button>
      </div>
    </div>
  );
}
