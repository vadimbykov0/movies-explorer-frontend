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

export default function MoviesCardList({
  movies,
  onDelete,
  addMovie,
  savedMovies,
  isLoading,
  serverError,
  inactiveFirstVisit
}) {

  const { pathname } = useLocation();

  const [moviesToRender, setMoviesToRender] = useState('');
  const fact = movies.slice(0, moviesToRender);

  function handleShowMoreMoviesButtonClick() {
    setMoviesToRender(moviesToRender + countNumberMoviesToRender().step)
  }

  function countNumberMoviesToRender() {
    const counter = { init: NUMBER_MOVIES_TO_RENDER_MAX, step: NUMBER_MOVIES_TO_ADD_MAX }
    if (window.innerWidth < SIZE_WIDTH_LARGE) {
      counter.init = NUMBER_MOVIES_TO_RENDER_LARGE
      counter.step = NUMBER_MOVIES_TO_ADD_MEDIUM
    } if (window.innerWidth < SIZE_WIDTH_MEDIUM) {
      counter.init = NUMBER_MOVIES_TO_RENDER_MEDIUM
      counter.step = NUMBER_MOVIES_TO_ADD_SMALL
    } if (window.innerWidth < SIZE_WIDTH_SMALL) {
      counter.init = NUMBER_MOVIES_TO_RENDER_SMALL
      counter.step = NUMBER_MOVIES_TO_ADD_SMALL
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setMoviesToRender(countNumberMoviesToRender().init)
      function renderMoviesForResize() {
        if (window.innerWidth >= NUMBER_MOVIES_TO_ADD_MAX) {
          setMoviesToRender(countNumberMoviesToRender().init)
        }
        if (window.innerWidth < NUMBER_MOVIES_TO_ADD_MAX) {
          setMoviesToRender(countNumberMoviesToRender().init)
        }
        if (window.innerWidth < SIZE_WIDTH_MEDIUM) {
          setMoviesToRender(countNumberMoviesToRender().init)
        }
        if (window.innerWidth < SIZE_WIDTH_SMALL) {
          setMoviesToRender(countNumberMoviesToRender().init)
        }
      }
      window.addEventListener('resize', renderMoviesForResize)
      return () => window.removeEventListener('resize', renderMoviesForResize)
    }
  }, [pathname])

  return (
    <section className="movies-cards" aria-label="Карточки фильмов">
      <ul className="movies-cards__lists">
        {
          isLoading ? <Preloader />
          : (pathname === '/saved-movies' && movies.length !== 0) ?
            movies.map(data => {
              return (
                <MoviesCard
                  key={data._id}
                  onDelete={onDelete}
                  data={data}
                />
              )
            })
          : (pathname === '/movies' && fact.length !== 0) ?
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
          : serverError ?
            <span className="movies-cards__message-search-error">
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз
            </span>
          : !inactiveFirstVisit ?
            <span className="movies-cards__message-search-error">
              Ничего не найдено
            </span>
          : pathname === '/saved-movies' ?
            <span className="movies-cards__message-search-error">
              В избранном пока ничего нет
            </span>
          :
            <span className="movies-cards__message-search-error">
              Выполните поиск, чтобы увидеть список фильмов
            </span>
        }
      </ul>
      {pathname === '/movies' &&
        <button
          className={`movies-cards__more ${moviesToRender >= movies.length && 'movies-cards__more_type_hidden'}`}
          type="button"
          onClick={handleShowMoreMoviesButtonClick}>
            Еще
        </button>
      }
    </section>
  )
}
