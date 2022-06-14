import "./App.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { setAnimesFound } from "./store/animeSlice";
import Main from "./components/Main/Main";
import { setSearchStatus } from "./store/animeSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeView from "./components/AnimeView/AnimeView";

function App() {
  const searchContent = useSelector((state) => state.anime.searchContent);
  const dispatch = useDispatch();
  const selectContent = useSelector((state) => state.anime.selectContent);

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
          searchContent.length > 3 ? `&search=${searchContent}` : ""
        }&sortBy=ranking&sortOrder=asc${
          selectContent.length > 1 ? `&genres=${selectContent}` : ""
        }`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          dispatch(setAnimesFound(response));
          dispatch(setSearchStatus(false));
        })
        .catch((err) => console.error(err));
    }
  }, [searchContent, dispatch, selectContent]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/animeview/:id" element={<AnimeView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
