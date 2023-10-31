import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page">
      <Routes>

        <Route
          path='/signin'
          element={
            <Main
              name='signin'
              setLoggedIn={setLoggedIn}
            />
          }
        />

        <Route
          path='/signup'
          element={
            <Main
              name='signup'
              setLoggedIn={setLoggedIn}
            />
          }
        />

        <Route
          path='/profile'
          element={
            <>
              <Header />
              <Main
                name='profile'
                setLoggedIn={setLoggedIn}
              />
            </>
          }
        />

        <Route
          path='/'
          element={
            <>
              <Header
                name='home'
                loggedIn={loggedIn}
              />
              <Main
                name='home'
              />
              <Footer />
            </>
          }
        />

        <Route
          path='*'
          element={
            <>
              <Main
                name='notfound'
              />
            </>
          }
        />

        <Route
          path='/movies'
          element={
            <>
              <Header />
              <Main
                name='movies'
              />
              <Footer />
            </>
          }
        />

        <Route
          path='/saved-movies'
          element={
            <>
              <Header />
              <Main
                name='savedmovies'
              />
              <Footer />
            </>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
