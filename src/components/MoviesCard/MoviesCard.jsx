import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './MoviesCard.css';

export default function MoviesCard({ data, onDelete, addMovie, savedMovies }) {
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (pathname === '/movies')
      setClick(savedMovies.some(element => data.id === element.movieId))
  }, [savedMovies, data.id, setClick, pathname])

  function onClick() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setClick(true)
      addMovie(data)
    } else {
      setClick(false)
      addMovie(data)
    }
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
  }

  return (
    <li className="movie-card-element">
      <article>
        <Link
          to={data.trailerLink}
          target="_blank"
        >
          <img
            className="movie-card-element__image"
            src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image}
            alt={data.name}
          />
        </Link>
        <div className="movie-card-element__card-info">
          <div className="movie-card-element__info-box">
            <h2 className="movie-card-element__title">{data.nameRU}</h2>
            <span className="movie-card-element__duration">{convertTime(data.duration)}</span>
          </div>
          {pathname === '/movies' ?
            <button
              type="button"
              className={`movie-card-element__handle ${click ? 'movie-card-element__handle_type_active' : ''}`}
              onClick={onClick}>
            </button>
            :
            <button
              type="button"
              className={`movie-card-element__handle movie-card-element__handle_type_delete`}
              onClick={() => onDelete(data._id)}>
            </button>
          }
        </div>
      </article>
    </li>
  )
}
