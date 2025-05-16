import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../common/loading";

function MovieInfo() {
  const { idValue } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${idValue}`
      );
      const json = await response.json();
      console.log("API Response:", json);

      if (json && json.data && json.data.movie) {
        setMovieInfo(json.data.movie);
        console.log("movieInfo: ", json.data.movie);
      } else {
        console.error("Invalid API response:", json);
      }
    };
    getMovie();
  }, [idValue]);

  return (
    <div className="p-5">
      {movieInfo ? (
        <div>
          <h6 className="text-4xl font-bold text-white font-montserrat pb-5">
            {movieInfo.title}
          </h6>
          <hr />
          <br />
          <img
            className="w-[300px] rounded-2xl"
            src={movieInfo.medium_cover_image}
            alt={movieInfo.title}
          />
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(`영화: ${movieInfo.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            Web Search
          </a>
          <p>{movieInfo.description_full}</p>
          <ul>
            {movieInfo.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default MovieInfo;
