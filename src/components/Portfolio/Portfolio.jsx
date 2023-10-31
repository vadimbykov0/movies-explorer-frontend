import { Link } from 'react-router-dom';

import WhiteArrow from '../../images/white-arrow.svg';

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
              <img className="portfolio__white-arrow" src={WhiteArrow} alt="Белая стрелка" />
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link" to={'https://github.com/vadimbykov0/russian-travel'} target='_blank'>
              <p className="portfolio__title-project">Адаптивный сайт</p>
              <img className="portfolio__white-arrow" src={WhiteArrow} alt="Белая стрелка" />
            </Link>
          </li>
          <li className="portfolio__list">
            <Link className="portfolio__link" to={'https://github.com/vadimbykov0/react-mesto-api-full-gha'} target='_blank'>
              <p className="portfolio__title-project">Одностраничное приложение</p>
              <img className="portfolio__white-arrow" src={WhiteArrow} alt="Белая стрелка" />
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
