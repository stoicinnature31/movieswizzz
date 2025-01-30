import React, { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const swiperRef = useRef(null);
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
        swiperRef.current.swiper.slideNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-screen-xl overflow-hidden mt-16 mx-auto">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        speed={2000}
        loop={true}
        className="w-full h-[700px]"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={movie?.Poster || "https://via.placeholder.com/300"}
              alt={movie?.Title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
              <h2 className="text-lg font-bold truncate">{movie?.Title}</h2>
              <p className="text-sm">{movie?.Year}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
