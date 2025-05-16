import { Link } from "react-router-dom";

function Detail({ id, coverImg, title, summary, genres }) {
  return (
    <div
      tabIndex={0}
      className="relative inline-block w-[270px] bg-gray-600 text-white rounded-2xl outline-none focus:ring-2 focus:ring-blue-400"
    >
      {/* 넘버링 박스 */}
      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
        {id}
      </div>
      {/* 영화 사진 */}
      <img src={coverImg} alt={title} className="w-full rounded-2xl" />
      {/* 설명 */}
      <div className="p-2.5">
        <h2 className="font-bold">
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <p className="pb-2">{summary}</p>
        <h1 className="font-bold">Genre</h1>
        <ul className="list-disc pl-5">
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detail;
