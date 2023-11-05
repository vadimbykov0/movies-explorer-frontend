import SectionAuth from '../SectionAuth/SectionAuth';
import useFormValidation from '../../hooks/useFormValidation';

import './Register.css';

export default function Login({ name, onRegister, isError, setIsError, isSend }) {
  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault()
    onRegister(
      values.username,
      values.email,
      values.password
    )
  }

  return (
    <SectionAuth
      name={name}
      isValid={isValid}
      onSubmit={onSubmit}
      isError={isError}
      setIsError={setIsError}
      isSend={isSend}
    >
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
          onChange={(evt) => {
            handleChange(evt)
            setIsError(false)
          }}
          autoComplete="on"
          disabled={isSend}
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
          onChange={(evt) => {
            handleChange(evt)
            setIsError(false)
          }}
          autoComplete="on"
          pattern={"^\\S+@\\S+\\.\\S+$"}
          disabled={isSend}
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
          onChange={(evt) => {
            handleChange(evt)
            setIsError(false)
          }}
          autoComplete="on"
          disabled={isSend}
          required
        />
        <span className="auth__error">{errors.password}</span>
      </fieldset>
    </SectionAuth>
  );
}
