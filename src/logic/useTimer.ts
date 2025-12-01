import { useState, useEffect, useRef, useCallback } from 'react';

export type FocusMode = 'HARD' | 'MEDIUM' | 'LIGHT';
export type TimerState = 'WORK' | 'BREAK';

const MODES = {
    HARD: { work: 50 * 60, break: 10 * 60 },
    MEDIUM: { work: 25 * 60, break: 5 * 60 },
    LIGHT: { work: 15 * 60, break: 5 * 60 },
};

export const useTimer = () => {
    const [focusMode, setFocusMode] = useState<FocusMode>('MEDIUM');
    const [timerState, setTimerState] = useState<TimerState>('WORK');

    const [time, setTime] = useState(MODES.MEDIUM.work);
    const [isActive, setIsActive] = useState(false);

    const workerRef = useRef<Worker | null>(null);
    const stateRef = useRef({ timerState, focusMode });

    useEffect(() => {
        stateRef.current = { timerState, focusMode };
    }, [timerState, focusMode]);

    useEffect(() => {
        workerRef.current = new Worker(new URL('./timer.worker.ts', import.meta.url), {
            type: 'module',
        });

        workerRef.current.onmessage = (e) => {
            const { type, remainingTime } = e.data;
            if (type === 'TICK') {
                setTime(remainingTime);
            } else if (type === 'COMPLETE') {
                setIsActive(false);

                // Play sound for 5 seconds
                const audio = new Audio('./assets/alarm.mp3');
                audio.loop = true;
                audio.play().catch(e => console.error('Error playing sound:', e));

                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, 5000);

                const currentState = stateRef.current.timerState;
                const currentMode = stateRef.current.focusMode;

                if (currentState === 'WORK') {
                    new Notification('Pomodoro Timer', {
                        body: 'Work done! Starting break.',
                        icon: '/assets/tomato_break.png'
                    });

                    // Auto-switch to break and start
                    setTimerState('BREAK');
                    const breakTime = MODES[currentMode].break;
                    setTime(breakTime);
                    setIsActive(true);
                    workerRef.current?.postMessage({ command: 'START', payload: { duration: breakTime } });

                } else {
                    new Notification('Pomodoro Timer', {
                        body: 'Break over! Time to focus.',
                        icon: '/assets/tomato_work.png'
                    });

                    // Auto-switch to work and start
                    setTimerState('WORK');
                    const workTime = MODES[currentMode].work;
                    setTime(workTime);
                    setIsActive(true);
                    workerRef.current?.postMessage({ command: 'START', payload: { duration: workTime } });
                }
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const startTimer = useCallback(() => {
        setIsActive(true);
        workerRef.current?.postMessage({ command: 'START', payload: { duration: time } });
    }, [time]);

    const pauseTimer = useCallback(() => {
        setIsActive(false);
        workerRef.current?.postMessage({ command: 'STOP' });
    }, []);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        const newTime = timerState === 'WORK' ? MODES[focusMode].work : MODES[focusMode].break;
        setTime(newTime);
        workerRef.current?.postMessage({ command: 'RESET' });
    }, [focusMode, timerState]);

    const setMode = useCallback((newMode: FocusMode) => {
        setFocusMode(newMode);
        setTimerState('WORK'); // Reset to work when changing mode
        setTime(MODES[newMode].work);
        setIsActive(false);
        workerRef.current?.postMessage({ command: 'STOP' });
    }, []);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    return {
        time,
        isActive,
        focusMode,
        timerState,
        startTimer,
        pauseTimer,
        resetTimer,
        setMode
    };
};
