import React from 'react';
import tomatoIdle from '/assets/tomato_idle.png';
import tomatoWork from '/assets/tomato_work.png';
import tomatoBreak from '/assets/tomato_break.png';

interface TomatoAvatarProps {
    mode: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK';
    isActive: boolean;
}

export const TomatoAvatar: React.FC<TomatoAvatarProps> = ({ mode, isActive }) => {
    let imageSrc = tomatoIdle;

    if (mode === 'WORK' && isActive) {
        imageSrc = tomatoWork;
    } else if (mode !== 'WORK') {
        imageSrc = tomatoBreak;
    }

    return (
        <div className="tomato-container">
            <img
                src={imageSrc}
                alt="Pixel Art Tomato"
                className={`tomato-img ${isActive ? 'animate-bounce' : ''}`}
            />
        </div>
    );
};
