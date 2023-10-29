import { Link } from 'react-router-dom';

import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__nav">
        <ul className="portfolio__lists">
          <li className="portfolio__list">
            <Link className="portfolio__link" to={'https://github.com/vadimbykov0/how-to-learn'} target='_blank'>
              <p className="portfolio__title-project">Статичный сайт</p>
              <button className="portfolio__button" type="button"></button>
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link" to={'https://github.com/vadimbykov0/russian-travel'} target='_blank'>
              <p className="portfolio__title-project">Адаптивный сайт</p>
              <button className="portfolio__button" type="button"></button>
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link portfolio__link_type_last" to={'https://github.com/vadimbykov0/react-mesto-api-full-gha'} target='_blank'>
              <p className="portfolio__title-project">Одностраничное приложение</p>
              <button className="portfolio__button" type="button"></button>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
