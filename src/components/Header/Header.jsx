import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

import './Header.css'

export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function handelClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    function closeMobNavForResize() {
      if (document.documentElement.clientWidth > '767') {
        setIsOpen(false)
        window.removeEventListener('resize', closeMobNavForResize)
      }
    }
    if (isOpen) {
      window.addEventListener('resize', closeMobNavForResize)
      return () => window.removeEventListener('resize', closeMobNavForResize)
    }
  }, [isOpen])

  function clickLink() {
    setIsOpen(false)
  }

  return (
    <header className={`header ${name !== 'home' ? 'header_type_not-home' : ''}`}>
      {name === 'home' && !loggedIn ?
      <>
        <Link className="header__logo" to={'/'} />
        <nav>
          <ul className="header__nav-box">
            <li><Link className="header__button-signup" to={'/signup'}>Регистрация</Link></li>
            <li><Link className="header__button-signin" to={'/signin'}>Войти</Link></li>
          </ul>
        </nav>
      </>
      :
      <>
        <div className="header__box">
          <Link className="header__logo" to={'/'} />
          <nav className={`header__nav ${isOpen ? 'header__nav_open' : ''}`}>
            <ul className="header__nav-box header__nav-box_type_not-home">
              <li className="header__link-box">
                <Link className={`header__link ${pathname === '/' ? 'header__link_type_active' : ''}`} to={'/'} onClick={clickLink}>Главная</Link>
              </li>
              <li className="header__link-box">
                <Link className={`header__link ${pathname === '/movies' ? 'header__link_type_active' : ''}`} to={'/movies'} onClick={clickLink}>Фильмы</Link>
              </li>
              <li className="header__link-box">
                <Link className={`header__link ${pathname === '/saved-movies' ? 'header__link_type_active' : ''}`} to={'/saved-movies'} onClick={clickLink}>Сохранённые фильмы</Link>
              </li>
              <li className="header__link-box">
                <Link className={`header__link header__link_type_profile ${pathname === '/profile' ? 'header__link_type_active' : ''}`} to={'/profile'} onClick={clickLink}>Аккаунт
                  <div className="header__profile-icon"></div>
                </Link>
              </li>
            </ul>
            <button className="header__mob-nav-close" type="button" onClick={handelClick}></button>
          </nav>
          <button className="header__mob-nav" type="button" onClick={handelClick}></button>
        </div>
      </>
      }
    </header>
  );
}
