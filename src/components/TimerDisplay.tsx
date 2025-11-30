import React from 'react';

interface TimerDisplayProps {
    time: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className="timer-display">
            {formattedTime}
        </div>
    );
};
