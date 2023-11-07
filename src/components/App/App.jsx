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

  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);

  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [isLoadingUpdateCurrentUser, setIsLoadingUpdateCurrentUser] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      Promise.all([
        mainApi.getUserData(token),
        mainApi.getSavedMovies(token)
      ])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setIsCheckToken(false)
          setLoggedIn(true)
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

  function handleDeleteSavedMovie(deleteMovieId) {
    mainApi.deleteSavedMovie(deleteMovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(
          movie => { return movie._id !== deleteMovieId }
        ))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleToggleMovie(data) {
    const isAdd = savedMovies.some(i => data.id === i.movieId)
    const searchClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteSavedMovie(searchClickMovie[0]._id)
    } else {
      mainApi.saveMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  function handleUpdateCurrentUser(username, email) {
    setIsLoadingUpdateCurrentUser(true)
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
      .finally(() => setIsLoadingUpdateCurrentUser(false))
  }

  function handleSignIn(email, password) {
    setIsLoadingSignIn(true)
    mainApi.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        navigate('/movies')
        setLoggedIn(true)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при авторизации пользователя ${err}`)
      })
      .finally(() => setIsLoadingSignIn(false))
  }

  function handleSignUp(username, email, password) {
    setIsLoadingSignUp(true)
    mainApi.register(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          handleSignIn(email, password)
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при регистрации пользователя ${err}`)
      })
      .finally(() => setIsLoadingSignUp(false))
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
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
                  onLogin={handleSignIn}
                  setIsError={setIsError}
                  isError={isError}
                  isSend={isLoadingSignIn}
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
                  onRegister={handleSignUp}
                  setIsError={setIsError}
                  isError={isError}
                  isSend={isLoadingSignUp}
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
                  logOut={handleSignOut}
                  onUpdateCurrentUser={handleUpdateCurrentUser}
                  isError={isError}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                  isSend={isLoadingUpdateCurrentUser}
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
                  onDelete={handleDeleteSavedMovie}
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
