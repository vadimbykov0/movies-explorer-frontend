import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import {
  SIZE_WIDTH_LARGE,
  SIZE_WIDTH_MEDIUM,
  SIZE_WIDTH_SMALL,

  NUMBER_MOVIES_TO_RENDER_MAX,
  NUMBER_MOVIES_TO_RENDER_LARGE,
  NUMBER_MOVIES_TO_RENDER_MEDIUM,
  NUMBER_MOVIES_TO_RENDER_SMALL,

  NUMBER_MOVIES_TO_ADD_MAX,
  NUMBER_MOVIES_TO_ADD_MEDIUM,
  NUMBER_MOVIES_TO_ADD_SMALL
} from '../../utils/constants';

import './MoviesCardList.css';

export default function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, serverError, firstEntrance }) {
  const { pathname } = useLocation();
  const [count, setCount] = useState('');
  const fact = movies.slice(0, count);

  function printCards() {
    const counter = { init: NUMBER_MOVIES_TO_RENDER_MAX, step: NUMBER_MOVIES_TO_ADD_MAX }
    if (window.innerWidth < SIZE_WIDTH_LARGE) {
      counter.init = NUMBER_MOVIES_TO_RENDER_LARGE
      counter.step = NUMBER_MOVIES_TO_ADD_MEDIUM
    }
    if (window.innerWidth < SIZE_WIDTH_MEDIUM) {
      counter.init = NUMBER_MOVIES_TO_RENDER_MEDIUM
      counter.step = NUMBER_MOVIES_TO_ADD_SMALL
    }
    if (window.innerWidth < SIZE_WIDTH_SMALL) {
      counter.init = NUMBER_MOVIES_TO_RENDER_SMALL
      counter.step = NUMBER_MOVIES_TO_ADD_SMALL
    }

    return counter;
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(printCards().init)
      function printCardsForResize() {
        if (window.innerWidth >= NUMBER_MOVIES_TO_ADD_MAX) {
          setCount(printCards().init)
        }
        if (window.innerWidth < NUMBER_MOVIES_TO_ADD_MAX) {
          setCount(printCards().init)
        }
        if (window.innerWidth < SIZE_WIDTH_MEDIUM) {
          setCount(printCards().init)
        }
        if (window.innerWidth < SIZE_WIDTH_SMALL) {
          setCount(printCards().init)
        }
      }
      window.addEventListener('resize', printCardsForResize)
      return () => window.removeEventListener('resize', printCardsForResize)
    }
  }, [pathname, movies])

  function clickShowMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className="movies-cards" aria-label="Карточки фильмов">
      <ul className="movies-cards__lists">
        {isLoading ? <Preloader /> :
          (pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
                  data={data}
                />
              )
            })
            :
            movies.length !== 0 ?
            movies.map(data => {
              return (
                <MoviesCard
                  key={data._id}
                  onDelete={onDelete}
                  data={data}
                />
              )
            })
            :
            serverError ?
              <span className="movies-cards__search-error">
                Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз
              </span>
            : !firstEntrance ?
              <span className="movies-cards__search-error">
                Ничего не найдено
              </span>
            : pathname === '/movies' ?
              <span className="movies-cards__search-error">
                Выполните поиск, чтобы увидеть список фильмов
              </span>
            :
              <span className="movies-cards__search-error">
                Нет сохраненных фильмов
              </span>
        }
      </ul>
      {pathname === '/movies' &&
        <button
          type="button"
          className={`movies-cards__more ${count >= movies.length && 'movies-cards__more_type_hidden'}`}
          onClick={clickShowMore}>
            Ещё
        </button>
      }
    </section>
  )
}
