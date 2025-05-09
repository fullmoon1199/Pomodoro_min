import { useEffect } from "react";
import './timer.css';

/*
timeLeft={timeLeft}
setTimeLeft={setTimeLeft}
isRunning={timerRun}
onTimerEnd={handleTimerEnd}
*/
function Timer({ timeLeft, setTimeLeft, isRunning, onTimerEnd}) {
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // 시간 끝나고 상태 전환 및 초기화
        if (prev < 1) {
          clearInterval(interval);
          onTimerEnd();
          return 0;
        }
        return prev - 1;
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setTimeLeft, onTimerEnd]);

  const formatTime = (time) => {
    console.log(`time: ${time}`);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
      <div>
        {String(minutes).padStart(2, "0") +
          " : " +
          String(seconds).padStart(2, "0")}
      </div>
    );
  };

  return (
    <div className={"clock"}>
      <h2>{formatTime(timeLeft)}</h2>
    </div>
  );
}

export default Timer;
