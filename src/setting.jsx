import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./setting.css";

function Setting({
  workDuration,
  restDuration,
  setWorkDuration,
  setRestDuration,
  onClose,
}) {
  const [workTime, setWorkTime] = useState(workDuration / 60);
  const [restTime, setRestTime] = useState(restDuration / 60);

  const handleSave = () => {
    setWorkDuration(workTime * 60);
    setRestDuration(restTime * 60);
    onClose(); // 모달 닫기
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal") {
      onClose(); // 배경 클릭 시 모달 닫기
    }
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalContents">
          <h2>Settings</h2>
          <label>
            Work Duration (minutes)
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
            />
          </label>
          <label className="restDurationLabel">
            Rest Duration (minutes)
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(Number(e.target.value))}
            />
          </label>
          <div className="modalButtons">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>,
    document.body // 모달을 <body> 아래에 렌더링
  );
}

export default Setting;
