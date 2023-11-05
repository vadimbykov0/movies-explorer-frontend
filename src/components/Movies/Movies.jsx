import { useCallback, useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';

export default function Movies({ isError, setIsError, addMovie, savedMovies}) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    localStorage.setItem('movie', JSON.stringify(search))
    localStorage.setItem('shorts', JSON.stringify(isCheck))
    localStorage.setItem('allMovies', JSON.stringify(movies))
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      moviesApi.getMovies()
      .then((res) => {
        setAllMovies(res)
        setIsCheck(false)
        setServerError(false)
        setFirstEntrance(false)
        filter(search, isCheck, res)
      })
      .catch(err => {
        setServerError(true)
        console.error(`Ошибка при поиске фильмов ${err}`)
      })
      .finally(() => setIsLoading(false))
    } else {
      filter(search, isCheck, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.allMovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allMovies)
      const search = JSON.parse(localStorage.movie)
      const isCheck = JSON.parse(localStorage.shorts)
      setServerError(false)
      setFirstEntrance(false)
      setSearchedMovie(search)
      setIsCheck(isCheck)
      setAllMovies(movies)
      filter(search, isCheck, movies)
    }
  }, [filter])

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        isError={isError}
        setIsError={setIsError}
        firstEntrance={firstEntrance}
        movies={allMovies}
        filter={filter}
      />
      <MoviesCardList
        movies={filteredMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
        firstEntrance={firstEntrance}
        />
    </>
  )
}
