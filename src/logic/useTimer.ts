import { useState, useEffect, useRef, useCallback } from 'react';

type TimerMode = 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK';

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

export const useTimer = () => {
    const [time, setTime] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<TimerMode>('WORK');
    const workerRef = useRef<Worker | null>(null);

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
                new Notification('Pomodoro Timer', {
                    body: 'Time is up! Take a break or get back to work!',
                    icon: '/assets/tomato_idle.png'
                });

                const audio = new Audio('/assets/alarm.mp3');
                audio.play().catch(e => console.error('Error playing sound:', e));
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
        let newTime = WORK_TIME;
        if (mode === 'SHORT_BREAK') newTime = SHORT_BREAK_TIME;
        if (mode === 'LONG_BREAK') newTime = LONG_BREAK_TIME;

        setTime(newTime);
        workerRef.current?.postMessage({ command: 'RESET' });
    }, [mode]);

    const switchMode = useCallback((newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        workerRef.current?.postMessage({ command: 'STOP' });

        if (newMode === 'WORK') setTime(WORK_TIME);
        else if (newMode === 'SHORT_BREAK') setTime(SHORT_BREAK_TIME);
        else if (newMode === 'LONG_BREAK') setTime(LONG_BREAK_TIME);
    }, []);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    return { time, isActive, mode, startTimer, pauseTimer, resetTimer, switchMode };
};
