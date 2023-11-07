import { useCallback, useState, useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({
  savedMovies,
  onDelete,
  isError,
  setIsError
}) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [inactiveFirstVisit, setInactiveFirstVisit] = useState(true);

  const filter = useCallback((searchQuery, isCheck, movies) => {
    setSearchedMovie(searchQuery)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  useEffect(() => {
    if (savedMovies.length === 0) {
      setInactiveFirstVisit(true)
    } else {
      setInactiveFirstVisit(false)
    }
    filter(searchedMovie, isCheck, savedMovies)
  }, [filter, searchedMovie, isCheck, savedMovies])

  function searchMovies(search) {
    setInactiveFirstVisit(false)
    filter(search, isCheck, savedMovies)
  }

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        isError={isError}
        setIsError={setIsError}
        inactiveFirstVisit={inactiveFirstVisit}
        savedMovie={savedMovies}
        movies={savedMovies}
        filter={filter}
        setIsCheck={setIsCheck}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        inactiveFirstVisit={inactiveFirstVisit}
      />
    </>
  )
}
