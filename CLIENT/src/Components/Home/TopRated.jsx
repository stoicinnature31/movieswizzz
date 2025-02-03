import React, { useState, useEffect, memo, useCallback } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Loader from '../../Loader/Loader.jsx'

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const moviesPerPage = 12;
  const apiKey = "81a74c01";

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const movieList = [];
    const keywords = ["game", "suspense", "movie", "comedy", "thriller"];
    const totalResults = 100;

    try {
      for (const keyword of keywords) {
        for (let page = 1; page <= Math.ceil(totalResults / 10); page++) {
          const url = `https://www.omdbapi.com/?s=${keyword}&page=${page}&apikey=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();


          if (data && data.Search) {
            movieList.push(...data.Search);
          }
        }
      }
      setMovies(movieList);
      setTotalPages(Math.ceil(movieList.length / moviesPerPage));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchMovies();
  }, []);

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-16 bg-black px-10 py-10">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-sky-500 mb-6">Top Rated Movies</h1>

        {loading ? (
          <div className="text-white text-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {currentMovies.map((movie, index) => (
              <div key={index} className="bg-dry rounded overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                <Link to={`/movies/${movie?.Title}`}>
                  <img
                    src={movie?.Poster !== "N/A" ? movie?.Poster : "https://via.placeholder.com/300"}
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-4 text-center">
                    <h3 className="text-sm font-bold text-white truncate">
                      {movie.Title}
                    </h3>
                    <p className="text-sm text-gray-400">{movie?.Year}</p>
                    <p className="text-xs text-blue-700 font-semibold mt-2">⭐ {movie?.Type}</p>
                  </div>
                </Link>

              </div>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(TopRatedMovies);
