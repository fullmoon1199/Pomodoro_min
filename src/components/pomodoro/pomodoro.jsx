import { useState, useEffect } from "react";
import Timer from "../timer/timer";
import Setting from "../setting/setting";
import Pagination from "../pagination/pagination";

function Pomodoro() {
  const [isWork, setIsWork] = useState(true);
  const [timerRun, setTimerRun] = useState(false);
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [restDuration, setRestDuration] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [progress, setProgress] = useState(workDuration);
  const [settingOpen, setSettingOpen] = useState(false);

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

  useEffect(() => {
    setWorkDuration((prev) => prev);
    setRestDuration((prev) => prev);
  }, []);

  useEffect(() => {
    setTimeLeft(isWork ? workDuration : restDuration);
  }, [isWork, workDuration, restDuration]);

  useEffect(() => {
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${timerRun ? (isWork ? "bg-green-100" : "bg-blue-100") : "bg-gray-100"}`}>
      {settingOpen && (
        <Setting
          workDuration={workDuration}
          restDuration={restDuration}
          setWorkDuration={setWorkDuration}
          setRestDuration={setRestDuration}
          onClose={() => setSettingOpen(false)}
        />
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-4">♣ Pomodoro</h1>

      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          title="Setting"
          onClick={() => setSettingOpen((prev) => !prev)}
        >
          Setting
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          title="Movie"
          onClick={() => (window.location.href = "/movie")}
        >
          Movie
        </button>
      </div>

      <div className="w-full max-w-md mb-4">
        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl font-medium text-gray-700 mb-4">
        {isWork ? "Work Hard!!" : "Rest~"}
      </h2>

      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        isRunning={timerRun}
        onTimerEnd={handleTimerEnd}
        progressBar={setProgress}
      />

      <div className="flex gap-4 mt-6">
        <button
          title={timerRun ? "stop" : "start"}
          className={`px-6 py-2 rounded text-white font-semibold transition ${
            timerRun ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => setTimerRun((prev) => !prev)}
        >
          {timerRun ? "Pause" : "Start"}
        </button>
        <button
          title="reset"
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={handleTimerReset}
        >
          Reset
        </button>
      </div>

      <div className="mt-6">
        <Pagination
          setIsWork={setIsWork}
          setTimeLeft={setTimeLeft}
          workDuration={workDuration}
          restDuration={restDuration}
          setTimerRun={setTimerRun}
        />
      </div>
    </div>
  );
}

export default Pomodoro;