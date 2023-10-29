import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

export default function MoviesCardList({ movies }) {
  const [count, setCount] = useState(printCards().initial);
  const fact = movies.slice(0, count);

  function clickShowMore() {
    setCount(count + printCards().step);
  }

  function printCards() {
    const counter = { initial: 16, step: 4}
    if (window.innerWidth < 1023) {
      counter.initial = 8
      counter.step = 2
    }

    if (window.innerWidth < 650) {
      counter.initial = 5
      counter.step = 2
    }

    return counter;
  }

  return (
    <section className="movies-cards" aria-label="Карточки фильмов">
      <ul className="movies-cards__lists">
        {fact.map(data => {
          return (
            <MoviesCard
              key={data.id}
              name={data.name}
              trailerLink={data.trailerLink}
              src={data.image}
            />
          )
        })}
      </ul>
      <button
        type='button'
        className={`movies-cards__more ${count >= movies.length && 'movies-cards__more_type_hidden'}`}
        onClick={clickShowMore}>
          Ещё
      </button>
    </section>
  );
}
