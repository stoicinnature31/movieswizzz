import './App.css';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Aos from 'aos';
import Loader from './Loader/Loader.jsx'
import SearchedMovies from './Screens/SearchedMovies.jsx';

function App() {
  Aos.init();

  // Lazy load components
  const HomeScreen = lazy(() => import('./Screens/HomeScreen.jsx'));
  const AboutUs = lazy(() => import('./Screens/AboutUs.jsx'));
  const ContactUs = lazy(() => import('./Screens/ContactUs.jsx'));
  const NotFound = lazy(() => import('./Screens/Notfound/NotFound.jsx'));
  const Movies = lazy(() => import('./Screens/Movies.jsx'));
  const SingleMovie = lazy(() => import('./Screens/SingleMovie.jsx'));
  const WatchPage = lazy(() => import('./Screens/WatchPage.jsx'));
  const Login = lazy(() => import('./Screens/Authentication/Login.jsx'));
  const Register = lazy(() => import('./Screens/Authentication/Register.jsx'));
  const Profile = lazy(() => import('./Screens/Dashboard/Profile.jsx'));
  const SearchedMovies = lazy(() => import('./Screens/SearchedMovies.jsx'));
  // const Loader = lazy(() => import('./Loader/Loader.jsx')); receiving error

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/search/:id" element={<SearchedMovies />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
