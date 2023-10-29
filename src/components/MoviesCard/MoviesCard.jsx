import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import './MoviesCard.css';

export default function MoviesCard({ name, src, trailerLink }) {
  const [click, setClick] = useState(false);
  const { pathname } = useLocation();

  function onClick() {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    };
  }

  return (
    <li className="movie-card-element">
      <article>
        <Link
          to={trailerLink}
          target='_blank'
        >
          <img className="movie-card-element__image" src={src} alt="Обложка фильма" />
        </Link>
        <div className="movie-card-element__card-info">
          <div className="movie-card-element__info-box">
            <p className="movie-card-element__title">{name}</p>
            <span className="movie-card-element__duration">1ч42м</span>
          </div>
          {pathname === '/movies' ?
            <button
              type='button'
              className={`movie-card-element__handle ${click ? 'movie-card-element__handle_type_active' : ''}`}
              onClick={onClick}>
            </button>
            :
            <button
              type='button'
              className={`movie-card-element__handle movie-card-element__handle_type_delete`}
              onClick={onClick}>
            </button>
          }
        </div>
      </article>
    </li>
  );
}
