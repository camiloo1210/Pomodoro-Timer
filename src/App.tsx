import { useTimer } from './logic/useTimer';
import { TomatoAvatar } from './components/TomatoAvatar';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { HealthTips } from './components/HealthTips';
import './App.css';

function App() {
  const { time, isActive, mode, startTimer, pauseTimer, resetTimer, switchMode } = useTimer();

  return (
    <div className="app-container">
      <h1 className="title">Pixel Pomodoro</h1>

      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'WORK' ? 'active' : ''}`}
          onClick={() => switchMode('WORK')}
        >
          Work
        </button>
        <button
          className={`mode-btn ${mode === 'SHORT_BREAK' ? 'active' : ''}`}
          onClick={() => switchMode('SHORT_BREAK')}
        >
          Short Break
        </button>
        <button
          className={`mode-btn ${mode === 'LONG_BREAK' ? 'active' : ''}`}
          onClick={() => switchMode('LONG_BREAK')}
        >
          Long Break
        </button>
      </div>

      <TomatoAvatar mode={mode} isActive={isActive} />
      <TimerDisplay time={time} />
      <Controls
        isActive={isActive}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
      <HealthTips mode={mode} />
    </div>
  );
}

export default App;
