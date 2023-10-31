import { Link, useNavigate } from 'react-router-dom';

import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBackBtnClick = () => {
    navigate(-1);
  };

  return (
    <section className="not-found">
      <div className="not-found__box">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link className="not-found__link" onClick={handleGoBackBtnClick}>Назад</Link>
      </div>
    </section>
  );
}
