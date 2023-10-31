import { useEffect, useState } from 'react';

import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { movies, saveMovies } from '../../utils/constants';

import './Main.css';

export default function Main({ name, setLoggedIn }) {
  const [moviesAll, setMoviesAll] = useState([]);
  const [saveMovie, setSaveMovie] = useState([]);
  const [isCheckMoviesAll, setIsCheckMoviesAll] = useState(true);
  const [isCheckMoviesSave, setIsCheckMoviesSave] = useState(true);

  useEffect(() => {
    setMoviesAll(movies)
    setSaveMovie(saveMovies)
  }, [])

  function onCheckMoviesSave() {
    if (isCheckMoviesSave) {
      setIsCheckMoviesSave(false)
      setSaveMovie(saveMovie.filter((element) => element.duration <= 40))
    } else {
      setIsCheckMoviesSave(true)
      setSaveMovie(saveMovies)
    }
  }

  function onCheckMoviesAll() {
    if (isCheckMoviesAll) {
      setIsCheckMoviesAll(false)

      setMoviesAll(moviesAll.filter((element) => element.duration <= 40))
    } else {
      setIsCheckMoviesAll(true)
      setMoviesAll(movies)
    }
  }

  return (
    <main className="main">
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin: <Login
                  name={name}
                  setLoggedIn={setLoggedIn}
                />,
        signup: <Register
                  name={name}
                  setLoggedIn={setLoggedIn}
                />,
        notfound: <NotFound />,
        profile: <Profile
                    name={name}
                    setLoggedIn={setLoggedIn}
                  />,
        movies:
          <>
            <SearchForm isCheck={isCheckMoviesAll} changeState={onCheckMoviesAll} />
            <MoviesCardList movies={moviesAll} />
          </>,
        savedmovies:
          <>
            <SearchForm isCheck={isCheckMoviesSave} changeState={onCheckMoviesSave} />
            <MoviesCardList movies={saveMovie} />
          </>
      }[name]}
    </main>
  );
}
