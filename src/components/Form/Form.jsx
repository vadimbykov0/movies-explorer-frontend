import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import './Form.css';

export default function Form({
  name,
  children,
  isValid,
  isSend,
  onSubmit,
  isError,
  setIsError,
  values,
  isSuccess,
  setSuccess,
  isEdit,
  setIsEdit
}) {

  const { pathname } = useLocation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setIsError(false)
  }, [setIsError, values])

  useEffect(() => {
    if (pathname === '/profile') {
      setSuccess(false)
      setIsEdit(false)
    }
  }, [pathname, setSuccess, setIsEdit])

  return (
    <form
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
      {
        name === 'signin' ?
          <>
            <span
              className={`auth__error-request ${isError && 'auth__error-request_type_active'}`}
            >
              {'При авторизации произошла ошибка'}
            </span>
            <button
              className={`auth__submit ${isValid && !isError ? '' : 'auth__submit_type_disabled'}`}
              type="submit"
              disabled={!isValid || isSend || isError}
            >
              {isSend ? `Войти ...` : 'Войти'}
            </button>
          </>
        :
        name === 'signup' ?
          <>
            <span
              className={`auth__error-request auth__error-request_type_reg ${isError && 'auth__error-request_type_active'}`}
            >
              {'При регистрации пользователя произошла ошибка'}
            </span>
            <button
              className={`auth__submit ${isValid && !isError ? '' : 'auth__submit_type_disabled'}`}
              type="submit"
              disabled={!isValid || isSend || isError}
            >
              {isSend ? `Зарегистрироваться ...` : 'Зарегистрироваться'}
           </button>
          </>
          : !isEdit ?
            <>
              <span
                className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}
              >
                {isError ? 'При обновлении профиля произошла ошибка' : 'Обновление профиля прошло успешно'}
              </span>
              <button
                className={`profile__submit`}
                type="button"
                onClick={() => {
                  setIsEdit(true)
                  setSuccess(false)
                }}
              >
                {'Редактировать'}
              </button>
            </>
            :
            <>
              <span
              className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}
              >
                {isError ? 'При обновлении профиля произошла ошибка' : 'Обновление профиля прошло успешно'}
              </span>
              <button
                type="submit"
                className={`auth__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'auth__submit_type_disabled' : ''}`}
                disabled={!isValid || isSend || isError}
              >
                {isSend ? `Сохранить ...` : 'Сохранить'}
              </button>
              <button
                type="button"
                className={`profile__submit`}
                onClick={() => {
                  setIsEdit(false)
                  setSuccess(false)
                  setIsError(false)
                }}
              >
                {'Отменить редактирование'}
              </button>
            </>
      }
    </form>
  )
}
