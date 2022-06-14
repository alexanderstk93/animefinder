import React, { useRef } from "react";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setSearch, setSelect } from "../../store/animeSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Navbar() {
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const searchContent = useSelector((state) => state.anime.searchContent);
  const selectContent = useSelector((state) => state.anime.selectContent);
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    setTimeout(() => {
      dispatch(setSearch(e.target.value));
    }, 1000);
  };

  const selectHandler = (e) => {
    if (selectRef.current.value === "none") {
      dispatch(setSelect(""));
    } else {
      dispatch(setSelect(selectRef.current.value));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>Anime Finder</div>
      <div className={styles.searchContainer}>
        <SearchIcon sx={{ width: "40px", height: "40px" }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search.."
          onChange={searchHandler}
        />
      </div>
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
        <option value="Hentai">Hentai</option>
        <option value="Ecchi">Ecchi</option>
      </select>
    </div>
  );
}
