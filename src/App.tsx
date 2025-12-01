import { useTimer, FocusMode } from './logic/useTimer';
import { TomatoAvatar } from './components/TomatoAvatar';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { HealthTips } from './components/HealthTips';
import { WaterTracker } from './components/WaterTracker';
import './App.css';

function App() {
  const {
    time,
    isActive,
    focusMode,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode
  } = useTimer();

  return (
    <div className="app-container">
      <h1 className="title">Pomodoro Timer</h1>

      <div className="mode-selector">
        <button
          className={`mode-btn ${focusMode === 'HARD' ? 'active' : ''}`}
          onClick={() => setMode('HARD')}
        >
          Hard
        </button>
        <button
          className={`mode-btn ${focusMode === 'MEDIUM' ? 'active' : ''}`}
          onClick={() => setMode('MEDIUM')}
        >
          Medium
        </button>
        <button
          className={`mode-btn ${focusMode === 'LIGHT' ? 'active' : ''}`}
          onClick={() => setMode('LIGHT')}
        >
          Light
        </button>
      </div>

      <div className="state-indicator">
        {timerState === 'WORK' ? 'FOCUS TIME' : 'BREAK TIME'}
      </div>

      <TomatoAvatar mode={timerState === 'WORK' ? 'WORK' : 'SHORT_BREAK'} isActive={isActive} />
      <TimerDisplay time={time} />
      <Controls
        isActive={isActive}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />

      <div className="extras">
        <WaterTracker />
        <HealthTips mode={timerState === 'WORK' ? 'WORK' : 'SHORT_BREAK'} />
      </div>
    </div>
  );
}

export default App;
