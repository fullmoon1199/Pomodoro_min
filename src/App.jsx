import { useState, useEffect } from "react";
import Timer from "./Timer";
import Setting from "./setting";
import "./App.css";

function App() {
  const [isWork, setIsWork] = useState(true); // 일하는시간
  const [timerRun, setTimerRun] = useState(false); // 타이머 상태
  const [workDuration, setWorkDuration] = useState(25 * 60); // 일하는 시간 x초*60
  const [restDuration, setRestDuration] = useState(5 * 60); // 쉬는 시간 y초*60
  const [timeLeft, setTimeLeft] = useState(workDuration); // 남은 시간
  const [progress, setProgress] = useState(workDuration); // 진행도
  const [settingOpen, setSettingOpen] = useState(false); // 모달창 열려있는지

  // 타이머 종료 시 work/rest 전환
  const handleTimerEnd = () => {
    if (isWork) {
      setIsWork(false);
      setTimeLeft(restDuration);
    } else {
      setIsWork(true);
      setTimeLeft(workDuration);
    }
    setTimerRun(false);
  };
  const handleTimerReset = () => {
    setTimerRun(false);
    setTimeLeft(workDuration);
    setIsWork(true);
  };
  // 나중에 쓸거
  useEffect(() => {
    setWorkDuration((prev) => prev);
    setRestDuration((prev) => prev);
  }, []);

  // work/rest 상태 변경 시 랜더링
  useEffect(() => {
    setTimeLeft(isWork ? workDuration : restDuration);
  }, [isWork, workDuration, restDuration]);

  useEffect(() => {
    // 작업 상태에 따라 body 클래스 변경
    document.body.className = isWork ? "working" : "resting";
  }, [isWork]);

  useEffect(() => {
    setProgress(
      isWork
        ? ((workDuration - timeLeft) / workDuration) * 100
        : ((restDuration - timeLeft) / restDuration) * 100
    );
  }, [timeLeft, workDuration, progress, restDuration, isWork]);

  return (
    <div className={timerRun ? (isWork ? "Working" : "Rest") : "Run"}>
      {settingOpen ? (
        <Setting
          workDuration={workDuration}
          restDuration={restDuration}
          setWorkDuration={setWorkDuration}
          setRestDuration={setRestDuration}
          onClose={() => setSettingOpen(false)}
        />
      ) : null}
      <h1 className={"AppDivH1"}>♣ Pomodoro</h1>
      <button
        className={"settingBtn"}
        title="Setting"
        onClick={() => setSettingOpen((settingOpen) => !settingOpen)}
      >
        setting
      </button>
      <div className="progressBarContainer">
        <div className="progressBar" style={{ width: `${progress}%` }}></div>
      </div>
      <h2 className={"Status"}>{isWork ? "Work Hard!!" : "Rest~"}</h2>
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        isRunning={timerRun}
        onTimerEnd={handleTimerEnd}
        progressBar={setProgress}
      />
      <div className="btnGroup">
        <button
          title={timerRun ? "stop" : "start"}
          className={`startBtn ${timerRun ? "stopBtn" : "startBtn"}`}
          onClick={() => setTimerRun((timerRun) => !timerRun)}
        >
          {timerRun ? "Pause" : "Start"}
        </button>
        <button
          title={"reset"}
          className="resetBtn"
          onClick={() => handleTimerReset()}
        >
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
