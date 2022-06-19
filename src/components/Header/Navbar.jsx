import React, { useRef } from "react";
import styles from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setSearch, setSelect } from "../../store/animeSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import { setIsLoggedIn, setUsername } from "../../store/userStatus";

export default function Navbar() {
  const inputRef = useRef(null);

  const selectRef = useRef(null);

  const searchContent = useSelector((state) => state.anime.searchContent);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.userStatus.isLoggedIn);
  const loggedInUserName = useSelector((state) => state.userStatus.username);
  const searchHandler = (e) => {
    setTimeout(() => {
      dispatch(setSearch(e.target.value));
    }, 1000);
  };

  const logOutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    dispatch(setIsLoggedIn(false));
    dispatch(setUsername(""));
  };

  return (
    <div className={styles.container}>
      <div className={styles.navBackground}>
        <img src={require("../../assets/images/wallpaper-1.png")} alt="" />
      </div>
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
      <div
        className={styles["login-register"]}
        style={isLoggedIn ? { display: "none" } : { display: "block" }}
      >
        <Link to={"/login"}>Log In</Link>
        <Link to={"/register"}>Register</Link>
      </div>
      <div
        className={styles["loggedInUser-info"]}
        style={isLoggedIn ? { display: "flex" } : { display: "none" }}
      >
        <div className={styles.connectedAs}>
          <p>Connected as</p>
          <h4>{loggedInUserName}</h4>
        </div>
        <p onClick={logOutHandler} className={styles.logOut}>
          Log Out
        </p>
      </div>
    </div>
  );
}
