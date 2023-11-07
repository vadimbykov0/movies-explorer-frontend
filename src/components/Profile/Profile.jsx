import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Form from '../Form/Form';
import useFormValidation from '../../hooks/useFormValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './Profile.css';

export default function Profile({
  name,
  logOut,
  onUpdateCurrentUser,
  isError,
  setIsError,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit,
  isSend
}) {

  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation();

  useEffect(() => {
    reset({
      username: currentUser.name,
      email: currentUser.email
    })
  }, [reset, currentUser, isEdit])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCurrentUser(
      values.username,
      values.email
    )
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={handleSubmit}
        isError={isError}
        setIsError={setIsError}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        isSend={isSend}
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
            disabled={isSend || !isEdit}
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
            disabled={isSend || !isEdit}
            pattern={"^\\S+@\\S+\\.\\S+$"}
            required
          />
        </fieldset>
        <span className="profile__error profile__error_type_email">{errors.email}</span>
      </Form>
      <Link
        className="profile__link"
        to={'/'}
        onClick={logOut}
      >
        Выйти из аккаунта
      </Link>
    </section>
  )
}
