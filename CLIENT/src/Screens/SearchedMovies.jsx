import React from "react";
import { Link } from "react-router-dom";
import useSearchStore from "../Store/Store.js";
import Layout from "../Layouts/Layout.jsx";

const SearchedMovies = () => {
    const { searchResults } = useSearchStore();

    if (searchResults.length === 0) return null;

    return (
        <Layout>
            <div className="my-16 bg-black px-10 py-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {searchResults.map((movie, index) => (
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
                </div>
            </div>
        </Layout>



    );
};

export default SearchedMovies;