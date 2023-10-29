import './Form.css';

export default function Form({ name, children, isValid, onSubmit }) {
  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className="auth__error-request">{'Вы ввели неправильный логин или пароль.'}</span>
          <button className={`auth__submit ${isValid ? '' : 'auth__submit_type_disabled'}`} type="submit" disabled={!isValid}>{'Войти'}</button>
        </>
      :
      name === 'signup' ?
        <>
          <span className="auth__error-request auth__error-request_type_reg">{'При регистрации пользователя произошла ошибка.'}</span>
          <button className={`auth__submit ${isValid ? '' : 'auth__submit_type_disabled'}`} type="submit">{'Зарегистрироваться'}</button>
        </>
        :
        <>
          <span className="profile__error-request">{'При обновлении профиля произошла ошибка.'}</span>
          <button className="profile__submit" type="submit">{'Редактировать'}</button>
        </>
      }
    </form>
  );
}
