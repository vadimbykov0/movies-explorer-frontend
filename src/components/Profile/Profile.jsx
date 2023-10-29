import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Form from '../Form/Form';
import useFormValidation from '../../hooks/useFormValidation';

import './Profile.css';

export default function Profile({ name, setLoggedIn }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

  useEffect(() => {
    reset({username: 'Виталий', email: 'pochta@yandex.ru'})
  }, [reset])

  function outLogin() {
    setLoggedIn(false);
  }

  function onEdit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, Виталий!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onEdit}
      >
        <fieldset className="profile__fieldset">
          <span className="profile__subtitle">Имя</span>
          <input
            name="username"
            type="text"
            minLength={2}
            maxLength={30}
            placeholder="Введите имя"
            className={`profile__input ${isInputValid.username === undefined || isInputValid.username ? '' : 'profile__input_type_invalid'}`}
            value={values.username || ''}
            onChange={handleChange}
            required
          />
        </fieldset>
        <span className="profile__error profile__error_type_username">{errors.username}</span>
        <fieldset className="profile__fieldset">
          <span className="profile__subtitle">E-mail</span>
          <input
            name="email"
            type="email"
            minLength={2}
            maxLength={35}
            placeholder="Введите e-mail"
            className={`profile__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'profile__input_type_invalid'}`}
            value={values.email || ''}
            onChange={handleChange}
            required
          />
        </fieldset>
        <span className="profile__error profile__error_type_email">{errors.email}</span>
      </Form>
      <Link
        className="profile__link"
        to={'/'}
        onClick={outLogin}
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}
