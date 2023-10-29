import { Link, useLocation } from 'react-router-dom';

import './Footer.css';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer className={`footer ${pathname === '/saved-movies' && 'footer_type_saved-movies'}`}>
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__box">
        <p className="footer__text">&#169; 2023</p>
        <nav className="footer__nav">
          <Link className="footer__link" to={'https://practicum.yandex.ru'} target='_blank'>Яндекс.Практикум</Link>
          <Link className="footer__link" to={'https://github.com/vadimbykov0'} target='_blank'>Github</Link>
        </nav>
      </div>
    </footer>
  );
}
