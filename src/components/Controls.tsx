import React from 'react';

interface ControlsProps {
    isActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isActive, onStart, onPause, onReset }) => {
    return (
        <div className="controls">
            {!isActive ? (
                <button className="pixel-btn start-btn" onClick={onStart}>START</button>
            ) : (
                <button className="pixel-btn pause-btn" onClick={onPause}>PAUSE</button>
            )}
            <button className="pixel-btn reset-btn" onClick={onReset}>RESET</button>
        </div>
    );
};
