import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiSolidMoviePlay } from "react-icons/bi";
import Title from '../Title';
// import { movies } from '../../Data/MovieData';
import 'swiper/css'; // Core Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const swiperRef = useRef(null); // Ref for Swiper instance
  const [movies, setMovies] = useState([]);
  const apiKey = "81a74c01";

  const fetchMovies = useCallback(async () => {
    const movieList = [];
    const keywords = ["game", "suspense", "movie", "comedy", "thriller"];
    try {
      for (const keyword of keywords) {
        const url = `https://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Search) {
          movieList.push(...data.Search);
        }
      }
      setMovies(movieList);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiperInstance = swiperRef.current.swiper;
        swiperInstance.slideNext(); // Move to the next slide
      }
    }, 3000); // Change slides every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="max-w-screen-xl my-16 bg-dry px-10 py-10 mx-auto">
      {/* Title Section */}
      <Title title="Popular Movies" Icon={BiSolidMoviePlay} />

      {/* Movies Slider */}
      <div className="mt-6">
        <Swiper
          ref={swiperRef} // Attach ref to Swiper
          spaceBetween={20} // Space between slides
          slidesPerView={2} // Default: Display 2 slides on smaller screens
          loop={true} // Enable infinite loop
          breakpoints={{
            768: { slidesPerView: 3 }, // Tablets: 3 slides
            1024: { slidesPerView: 4 }, // Laptops and larger: 4 slides
          }}
          className="w-full"
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index} className="w-auto">
              <div className='border border-border p-1 hover:scale-95 transition relative rounded overflow-hidden'>
                <Link to={`/movies/${movie?.Title}`} className='w-full'>
                  <img src={`${movie?.Poster}`} alt={movie?.Title} className='w-full h-64 object-cover' />
                </Link>

                <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3'>
                  {/* //Need to see later 1:18: 29 */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularMovies;
