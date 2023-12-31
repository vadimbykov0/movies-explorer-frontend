import { HashLink } from 'react-router-hash-link';

import './Promo.css';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__box">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <HashLink className="promo__link" smooth to='#AboutProject'>Узнать больше</HashLink>
      </div>
      <div className="promo__img"></div>
    </section>
  )
}
