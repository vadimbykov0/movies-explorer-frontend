import SectionAuth from "../SectionAuth/SectionAuth";
import useFormValidation from '../../hooks/useFormValidation';

import '../Register/Register.css';

export default function Login({
  name,
  onLogin,
  isSend,
  isError,
  setIsError
}) {

  const { values, errors, isInputValid, isValid, handleChange } = useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault()
    onLogin(
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
          disabled={isSend}
          pattern={"^\\S+@\\S+\\.\\S+$"}
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
          disabled={isSend}
          required
        />
        <span className="auth__error">{errors.password}</span>
      </fieldset>
    </SectionAuth>
  )
}
