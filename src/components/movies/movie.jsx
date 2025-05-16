import { useState, useEffect } from "react";
import Detail from "./detail";
import Loading from "../common/loading";

function Movie() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const getMovies = async () => {
    const json = await (
      await fetch("https://yts.mx/api/v2/list_movies.json?")
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
    console.log(json);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredMovies = movies.filter((movie) => {
    const matchTitle = movie.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchGenre =
      selectedGenre === "" || movie.genres.includes(selectedGenre);
    return matchTitle && matchGenre;
  });

  return (
    <div className="pt-[50px] pl-[30px]">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="영화 제목 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="text-white bg-gray-800 placeholder-gray-400 p-2 rounded mr-1"
            />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="text-white bg-gray-800 placeholder-gray-400 p-2 rounded"
            >
              <option value="">ALL</option>
              {[...new Set(movies.flatMap((item) => item.genres))].map(
                (genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                )
              )}
            </select>
          </form>
          <br />
          <h1 className="text-3xl font-bold italic text-gray-300">
            Result: ({filteredMovies.length})
          </h1>
          <br />
          <div className="flex flex-row flex-wrap gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((item) => (
                <Detail
                  key={item.id}
                  id={item.id}
                  coverImg={item.medium_cover_image}
                  title={item.title}
                  summary={item.summary}
                  genres={item.genres}
                />
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
