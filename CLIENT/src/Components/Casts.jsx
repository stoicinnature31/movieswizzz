import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Casts = ({cast}) => {
  const sliderRef = useRef(null);
  

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const scrollInterval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        // Scroll to the start if at the end
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll to the next position
        slider.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={sliderRef}
      className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide"
    >
      {cast.actors.map((actor, index) => (
        <div
          key={index}
          className="min-w-[200px] border border-border p-1 hover:scale-95 transition relative rounded overflow-hidden"
        >
          <Link className="w-full">
            <img
              src={`${actor?.photo}`}
              alt={actor?.name}
              className="w-full h-64 object-cover"
            />
          </Link>

          <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
            {actor?.name} {/* Display actor name */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Casts;









// // Function to fetch actor image using TMDB API
// async function getActorImage(actorName) {
//   const tmdbApiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
//   const tmdbSearchUrl = `https://api.themoviedb.org/3/search/person?api_key=${tmdbApiKey}&query=${encodeURIComponent(actorName)}`;

//   try {
//     const response = await fetch(tmdbSearchUrl);
//     const data = await response.json();
//     if (data.results && data.results.length > 0) {
//       const profilePath = data.results[0].profile_path;
//       return `https://image.tmdb.org/t/p/w500${profilePath}`;
//     }
//     return null; // No image found
//   } catch (error) {
//     console.error('Error fetching actor image:', error);
//     return null;
//   }
// }

// // Function to fetch movie details and actor names using OMDb API
// async function getMovieActorsAndImage(movieName) {
//   const omdbApiKey = '81a74c01';
//   const omdbSearchUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${omdbApiKey}`;

//   try {
//     // Step 1: Search for the movie to get its IMDb ID
//     const searchResponse = await fetch(omdbSearchUrl);
//     const searchData = await searchResponse.json();
//     if (!searchData.Search || searchData.Search.length === 0) {
//       return { error: 'Movie not found' };
//     }

//     // Get the first movie's IMDb ID
//     const imdbID = searchData.Search[0].imdbID;

//     // Step 2: Fetch full movie details including actors
//     const movieDetailsUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`;
//     const detailsResponse = await fetch(movieDetailsUrl);
//     const detailsData = await detailsResponse.json();

//     // Extract actors (comma-separated string)
//     const actors = detailsData.Actors?.split(', ') || [];
    
//     // Step 3: Fetch images for the first actor (example)
//     let actorImageUrl = null;
//     if (actors.length > 0) {
//       actorImageUrl = await getActorImage(actors[0]);
//     }

//     return {
//       movie: detailsData.Title,
//       actors,
//       actorImageUrl,
//     };

//   } catch (error) {
//     console.error('Error:', error);
//     return { error: 'Failed to fetch data' };
//   }
// }

// // Example usage
// getMovieActorsAndImage('Inception')
//   .then(result => {
//     if (result.error) {
//       console.log(result.error);
//     } else {
//       console.log('Movie:', result.movie);
//       console.log('Actors:', result.actors);
//       console.log('First actor image URL:', result.actorImageUrl);
//     }
//   });