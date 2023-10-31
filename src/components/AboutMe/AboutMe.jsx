import { Link } from "react-router-dom";

import AboutMePortrait from '../../images/landing-photo.png';

import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__box">
        <div className="about-me__text-box">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <Link className="about-me__link" to={'https://github.com/vadimbykov0'} target='_blank'>Github</Link>
        </div>
        <img className="about-me__portrait" src={AboutMePortrait} alt="Портрет автора" />
      </div>
    </section>
  )
}
