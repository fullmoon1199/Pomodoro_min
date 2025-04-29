import { useState, useEffect } from "react";
import Timer from "./Timer";

function App() {
  const [isWork, setIsWork] = useState(true); // 일하는시간
  const [timerRun, setTimerRun] = useState(false); // 타이머 상태
  const [workDuration, setWorkDuration] = useState(5); // 일하는 시간 x초*60
  const [restDuration, setRestDuration] = useState(3); // 쉬는 시간 y초*60
  const [timeLeft, setTimeLeft] = useState(workDuration); // 남은 시간

  // 타이머 종료 시 work/rest 전환
  const handleTimerEnd = () => {
    if (isWork) {
      setIsWork(false);
      setTimeLeft(restDuration);
    } else {
      setIsWork(true);
      setTimeLeft(workDuration);
    }
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

  return (
    <div>
      <h1>Pomodoro</h1>
      <h2>{isWork ? "Work!!" : "Rest~"}</h2>
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        isRunning={timerRun}
        onTimerEnd={handleTimerEnd}
      />
      <button onClick={() => setTimerRun((timerRun) => !timerRun)}>
        {timerRun ? "Pause" : "Start"}
      </button>
      <button onClick={() => handleTimerReset()}>Reset</button>
    </div>
  );
}

export default App;
