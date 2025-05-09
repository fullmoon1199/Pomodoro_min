import React, { useState, useEffect } from "react";
import "./pagination.css";

function Pagination({
  setIsWork,
  setTimeLeft,
  workDuration,
  restDuration,
  setTimerRun,
}) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const totalPages = 3; // 총 페이지 수

  // 페이지 변경 핸들러
  const handlePageClick = (page) => {
    setCurrentPage(page); // 현재 페이지를 업데이트
    console.log(`Navigated to page ${page}`); // 페이지 이동 로그
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // 처음 페이지로 이동
  const handleFirst = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };
  // 마지막 페이지로 이동
  const handleLast = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      setIsWork(true);
      setTimeLeft(workDuration);
    }
    if (currentPage === 2) {
      setIsWork(false);
      setTimeLeft(restDuration);
    }
    setTimerRun(false);
  }, [currentPage, setIsWork, setTimerRun, setTimeLeft, workDuration, restDuration]);

  return (
    <div>
      <div className="pagination">
        <a href="#" onClick={handleFirst}>
          {"\u00AB"}
        </a>
        <a href="#" onClick={handlePrevious}>
          {"\u2039"}
        </a>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <a
              key={page}
              href="#"
              className={currentPage === page ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(page);
              }}
            >
              {page}
            </a>
          );
        })}
        <a href="#" onClick={handleNext}>
          {"\u203A"}
        </a>
        <a href="#" onClick={handleLast}>
          {"\u00BB"}
        </a>
      </div>
    </div>
  );
}

export default Pagination;
