import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Preloader from '../Preloader/Preloader';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './App.css';

import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSend, setIsSend] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserData(localStorage.jwt), mainApi.getSavedMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
      localStorage.clear()
    }
  }, [loggedIn])

  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])

  function handleDeleteMovie(deleteMovieId) {
    mainApi.deleteSavedMovie(deleteMovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deleteMovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleToggleMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const searchClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(searchClickMovie[0]._id)
    } else {
      mainApi.saveMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  function handleLogin(email, password) {
    setIsSend(true)
    mainApi.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(username, email, password) {
    setIsSend(true)
    mainApi.register(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          mainApi.authorize(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
            })
            .catch((err) => {
              setIsError(true)
              console.error(`Ошибка при авторизации после регистрации ${err}`)
            })
            .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function logOut() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  function editUserData(username, email) {
    setIsSend(true)
    mainApi.updateCurrentUserProfile(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <div className="page">
      {isCheckToken ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>

            <Route
              path="/signin"
              element={
                loggedIn ? <Navigate to="/movies" replace />
                :
                <Main
                  name="signin"
                  onLogin={handleLogin}
                  setIsError={setIsError}
                  isError={isError}
                  isSend={isSend}
                />
              }
            />

            <Route
              path="/signup"
              element={
                loggedIn ? <Navigate to="/movies" replace />
                :
                <Main
                  name="signup"
                  onRegister={handleRegister}
                  setIsError={setIsError}
                  isError={isError}
                  isSend={isSend}
                />
              }
            />

            <Route
              path="/"
              element={
                <>
                  <Header
                    name="home"
                    loggedIn={loggedIn}
                  />
                  <Main
                    name="home"
                  />
                  <Footer />
                </>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <Main
                    name="notfound"
                  />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Main}
                  name="profile"
                  loggedIn={loggedIn}
                  logOut={logOut}
                  editUserData={editUserData}
                  isError={isError}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                />
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Main}
                  name="movies"
                  savedMovies={savedMovies}
                  addMovie={handleToggleMovie}
                  loggedIn={loggedIn}
                  isError={isError}
                  setIsError={setIsError}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={Main}
                  name="savedmovies"
                  savedMovies={savedMovies}
                  onDelete={handleDeleteMovie}
                  loggedIn={loggedIn}
                  isError={isError}
                  setIsError={setIsError}
                />
              }
            />

          </Routes>
        </CurrentUserContext.Provider>
      }
    </div>
  );
}

export default App;
