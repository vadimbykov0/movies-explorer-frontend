import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';

import './SearchForm.css';

export default function SearchForm({
  isCheck,
  searchedMovie,
  searchMovies,
  isError,
  setIsError,
  inactiveFirstVisit,
  savedMovie,
  movies,
  filter,
  setIsCheck
}) {

  const { pathname } = useLocation();
  const { values, reset, handleChange } = useFormValidation();

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
    setIsError(false)
  }, [pathname, reset, searchedMovie, setIsError, savedMovie])

  function onSubmit(evt) {
    evt.preventDefault()
      if (evt.target.search.value) {
        searchMovies(evt.target.search.value)
        setIsError(false)
      } else {
        setIsError(true)
      }
  }

  function changeStateCheckbox() {
    if (isCheck) {
      setIsCheck(false)
      filter(values.search, false, movies)
    } else {
      setIsCheck(true)
      filter(values.search, true, movies)
    }
  }

  return (
    <section className="search">
      <div className="search__box">
        <form
          className="search__form"
          name={'SearchForm'}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="search__form-box">
            <input
            className="search__input"
            name="search"
            placeholder="Фильм"
            type="text"
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)
            }}
            value={values.search || ''}
            disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
            required
            />
            <button
              className={`search__submit ${savedMovie ? (pathname === '/saved-movies' && savedMovie.length === 0) && 'search__submit_type_disabled' : ''}`}
              type="submit"
            >
            </button>
          </div>
          <span className={`search__error ${isError && 'search__error_type_active'}`}>{'Нужно ввести ключевое слово'}</span>
          <FilterCheckbox
            isCheck={isCheck}
            changeStateCheckbox={changeStateCheckbox}
            inactiveFirstVisit={inactiveFirstVisit}
          />
        </form>
      </div>
    </section>
  )
}
