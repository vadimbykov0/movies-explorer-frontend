import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';

import './Main.css';

export default function Main({
  name,
  onRegister,
  onLogin,
  logOut,
  onUpdateCurrentUser,
  isSend,
  isEdit,
  setIsEdit,
  isError,
  setIsError,
  savedMovies,
  onDelete,
  addMovie,
  isSuccess,
  setSuccess
}) {

  return (
    <main className="main">
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin:
          <Login
            name={name}
            onLogin={onLogin}
            isError={isError}
            setIsError={setIsError}
            isSend={isSend}
          />,
        signup:
          <Register
            name={name}
            onRegister={onRegister}
            isError={isError}
            setIsError={setIsError}
            isSend={isSend}
          />,
        notfound:
          <NotFound />,
        profile:
          <>
            <Header />
            <Profile
              name={name}
              logOut={logOut}
              onUpdateCurrentUser={onUpdateCurrentUser}
              isError={isError}
              setIsError={setIsError}
              isSuccess={isSuccess}
              setSuccess={setSuccess}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              isSend={isSend}
            />
          </>,
        movies:
          <>
            <Header />
            <Movies
              savedMovies={savedMovies}
              addMovie={addMovie}
              isError={isError}
              setIsError={setIsError}
            />
            <Footer />
          </>,
        savedmovies:
          <>
            <Header />
            <SavedMovies
              onDelete={onDelete}
              savedMovies={savedMovies}
              isError={isError}
              setIsError={setIsError}
            />
            <Footer />
          </>
      }[name]}
    </main>
  )
}
