import { useCallback, useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';

export default function Movies({
  isError,
  setIsError,
  addMovie,
  savedMovies
}) {

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [isLoadingMoviesData, setIsLoadingMoviesData] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [inactiveFirstVisit, setInactiveFirstVisit] = useState(true);

  const filter = useCallback((searchQuery, isCheck, movies) => {
    localStorage.setItem('movie', JSON.stringify(searchQuery))
    localStorage.setItem('shortsMovies', JSON.stringify(isCheck))
    localStorage.setItem('allMovies', JSON.stringify(movies))
    setSearchedMovie(searchQuery)
    setFilteredMovies(movies.filter((item) => {
      const searchName = item.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      return isCheck ? (searchName && item.duration <= 40) : searchName
    }))
  }, [])

  useEffect(() => {
    if (localStorage.allMovies && localStorage.shortsMovies && localStorage.movie) {
      const movies = JSON.parse(localStorage.allMovies)
      const isCheck = JSON.parse(localStorage.shortsMovies)
      const searchQuery = JSON.parse(localStorage.movie)
      setServerError(false)
      setInactiveFirstVisit(false)
      setSearchedMovie(searchQuery)
      setIsCheck(isCheck)
      setAllMovies(movies)
      filter(searchQuery, isCheck, movies)
    }
  }, [filter])

  function searchMovies(searchQuery) {
    if (allMovies.length === 0) {
      setIsLoadingMoviesData(true)
      moviesApi.getMovies()
      .then((res) => {
        setAllMovies(res)
        setInactiveFirstVisit(false)
        setIsCheck(false)
        setServerError(false)
        filter(searchQuery, isCheck, allMovies)
      })
      .catch((err) => {
        setServerError(true)
        console.error(`Ошибка при поиске фильмов ${err}`)
      })
      .finally(() => setIsLoadingMoviesData(false))
    } else {
      filter(searchQuery, isCheck, allMovies)
    }
  }

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        isError={isError}
        setIsError={setIsError}
        inactiveFirstVisit={inactiveFirstVisit}
        movies={allMovies}
        filter={filter}
      />
      <MoviesCardList
        movies={filteredMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoadingMoviesData}
        serverError={serverError}
        inactiveFirstVisit={inactiveFirstVisit}
        />
    </>
  )
}
