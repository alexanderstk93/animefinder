import "./App.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { setAnimesFound } from "./store/animeSlice";
import Main from "./components/Main/Main";
import { setSearchStatus } from "./store/animeSlice";
import { useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeView from "./components/AnimeView/AnimeView";
import { setUsers } from "./store/usersSlice";
import RegisterPage from "./components/RegisterLogin/RegisterPage";
import LoginPage from "./components/RegisterLogin/LoginPage";
import {
  setIsLoggedIn,
  setUsername,
  setWindowHeight,
} from "./store/userStatus";

function App() {
  const searchContent = useSelector((state) => state.anime.searchContent);
  const [animesNumbers, setAnimesNumbers] = useState([]);
  const dispatch = useDispatch();
  const animesFound = useSelector((state) => state.anime.animesFound);
  const updateWindowHeightOnScroll = (value) => {
    dispatch(setWindowHeight(value));
  };

  window.addEventListener("scroll", () =>
    updateWindowHeightOnScroll(window.scrollY)
  );
  const selectContent = useSelector((state) => state.anime.selectContent);

  const animesFirestoreRef = collection(database, "animes");
  const localStorageIsLoggedIn = localStorage.getItem("isLoggedIn");

  const localStorageUsername = localStorage.getItem("username");

  if (localStorageIsLoggedIn) {
    dispatch(setIsLoggedIn(true));
    dispatch(setUsername(localStorageUsername));
  }

  // WRITE ANIMES NUMBER TO FIRESTORE
  // if (animesFound.length > 0) {
  //   animesFound.map(async (anime) => {
  //     await setDoc(doc(database, "animes", anime._id), { comments: "none" });
  //   });
  // }

  const deleteAllAnimes = async () => {
    try {
      await deleteDoc(doc(database, "animes", "10030"));
    } catch (err) {
      console.log(`coaieee ${err}`);
    }
  };

  deleteAllAnimes();

  // FETCH ANIMES FROM THE ANIMES API
  useEffect(() => {
    if (searchContent.length > 3 || selectContent) {
      dispatch(setSearchStatus(true));
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e9392d2534msh2258e74ccf0ac39p10289djsn7c176a998240",
          "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
        },
      };
      fetch(
        `https://anime-db.p.rapidapi.com/anime?page=1&size=50${
          searchContent.length === 0 || searchContent.length > 3
            ? `&search=${searchContent}`
            : ""
        }&sortBy=ranking&sortOrder=asc${
          selectContent.length > 1 ? `&genres=${selectContent}` : ""
        }`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          dispatch(setAnimesFound(response.data));
          dispatch(setSearchStatus(false));
        })
        .catch((err) => console.error(err));
    }
  }, [searchContent, selectContent, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/animeview/:id" element={<AnimeView />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "10rem",
                }}
              >
                Page not found, maybe check your request..?
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
