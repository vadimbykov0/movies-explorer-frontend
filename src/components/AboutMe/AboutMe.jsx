import { Link } from "react-router-dom";

import AboutMePortrait from '../../images/landing-photo.jpeg';

import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__box">
        <div className="about-me__text-box">
          <h3 className="about-me__name">Вадим</h3>
          <p className="about-me__job">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__description">Я родился в Ижевске. Жил в Испании и много путешествовал, в настоящее время живу и работаю в Москве. Я люблю фотографию и искусство, хочу осуществить собственный творческий проект и  нахожусь сейчас в поиске идеи для реализации. Недавно начал кодить. Прошёл курс по веб-разработке в Яндекс Практикуме.</p>
          <Link className="about-me__link" to={'https://github.com/vadimbykov0'} target='_blank'>Github</Link>
        </div>
        <img className="about-me__portrait" src={AboutMePortrait} alt="Портрет автора" />
      </div>
    </section>
  )
}
