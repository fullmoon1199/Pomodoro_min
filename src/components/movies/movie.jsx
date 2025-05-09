import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { idValue } = useParams(); // URL에서 idValue를 가져옴
  const [movieInfo, setMovieInfo] = useState(null); // 영화 정보를 저장할 상태

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
    <div>
      {movieInfo ? (
        <div>
          <h1>{movieInfo.title}</h1>
          <img src={movieInfo.medium_cover_image} alt={movieInfo.title} />
          <p>{movieInfo.description_full}</p>
          <ul>
            {movieInfo.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>Loading...</h1> // 데이터가 로드되지 않았을 때 표시
      )}
    </div>
  );
}

export default Detail;
