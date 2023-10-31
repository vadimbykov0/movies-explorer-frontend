import { useNavigate } from "react-router-dom";

import SectionAuth from "../SectionAuth/SectionAuth";
import useFormValidation from '../../hooks/useFormValidation';

import './Register.css';

export default function Login({ name, setLoggedIn }) {
  const navigate = useNavigate();
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

  function onLogin(evt) {
    evt.preventDefault()
    navigate('/signin')
    setLoggedIn(true)
  }

  return (
    <SectionAuth name={name} isValid={isValid} onSubmit={onLogin}>
      <fieldset className="auth__fieldset">
        <span className="auth__subtitle">Имя</span>
        <input
          name="username"
          type="text"
          minLength={2}
          maxLength={30}
          placeholder="Введите имя"
          className={`auth__input ${isInputValid.username === undefined || isInputValid.username ? '' : 'auth__input_type_invalid'}`}
          value={values.username || ''}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <span className="auth__error">{errors.username}</span>
      </fieldset>
      <fieldset className="auth__fieldset">
        <span className="auth__subtitle">E-mail</span>
        <input
          name="email"
          type="email"
          minLength={2}
          maxLength={35}
          placeholder="Введите e-mail"
          className={`auth__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'auth__input_type_invalid'}`}
          value={values.email || ''}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <span className="auth__error">{errors.email}</span>
      </fieldset>
      <fieldset className="auth__fieldset">
        <span className="auth__subtitle">Пароль</span>
        <input
          name="password"
          type="password"
          minLength={8}
          maxLength={8}
          placeholder="Введите пароль"
          className={`auth__input ${isInputValid.password === undefined || isInputValid.password ? '' : 'auth__input_type_invalid'}`}
          value={values.password || ''}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <span className="auth__error">{errors.password}</span>
      </fieldset>
    </SectionAuth>
  );
}
