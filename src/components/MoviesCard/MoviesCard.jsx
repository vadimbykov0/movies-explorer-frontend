import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import convertTime from '../../utils/convertTime';

import './MoviesCard.css';

export default function MoviesCard({
  data,
  savedMovies,
  onDelete,
  addMovie
}) {

  const { pathname } = useLocation();
  const [isClickFavoriteButton, setIsClickFavoriteButton] = useState(false);

  useEffect(() => {
    if (pathname === '/movies')
      setIsClickFavoriteButton(savedMovies.some(i => data.id === i.movieId))
  }, [savedMovies, setIsClickFavoriteButton, data.id, pathname])

  function handleClickFavoriteButton() {
    if (savedMovies.some(i => data.id === i.movieId)) {
      addMovie(data);
      setIsClickFavoriteButton(true);
    } else {
      addMovie(data);
      setIsClickFavoriteButton(false);
    }
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
            alt={data.name}
            src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image}
          />
        </Link>
        <div className="movie-card-element__card-info">
          <div className="movie-card-element__info-box">
            <h2 className="movie-card-element__title">{data.nameRU}</h2>
            <span className="movie-card-element__duration">{convertTime(data.duration)}</span>
          </div>
          {pathname === '/movies' ?
            <button
              className={`movie-card-element__handle ${isClickFavoriteButton ? 'movie-card-element__handle_type_active' : ''}`}
              type="button"
              onClick={handleClickFavoriteButton}>
            </button>
            :
            <button
              className={`movie-card-element__handle movie-card-element__handle_type_delete`}
              type="button"
              onClick={() => onDelete(data._id)}>
            </button>
          }
        </div>
      </article>
    </li>
  )
}
