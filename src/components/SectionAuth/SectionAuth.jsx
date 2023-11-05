import { Link } from 'react-router-dom';

import Form from '../Form/Form';

import './SectionAuth.css';

export default function SectionAuth({ name, children, isValid, onSubmit, isError, setIsError, isSend }) {
  return (
    <section className="auth">
      <Link className="auth__link auth__link_type_home" to={'/'}></Link>
      <h1 className="auth__title">
        {name === 'signin' ? 'Рады видеть!' : 'Добро пожаловать!'}
      </h1>
      <Form name={name} isValid={isValid} onSubmit={onSubmit} isError={isError} setIsError={setIsError} isSend={isSend}>
        {children}
      </Form>
      {
      name === 'signin' ? <p className="auth__text">Ещё не зарегистрированы? <Link className="auth__link auth__link_type_nav" to={'/signup'}>Регистрация</Link></p>
      :
      name === 'signup' ? <p className="auth__text">Уже зарегистрированы? <Link className="auth__link auth__link_type_nav" to={'/signin'}>Войти</Link></p>
      :
      <Link to={'/'}>Выйти из аккаунта</Link>
      }
    </section>
  );
}
