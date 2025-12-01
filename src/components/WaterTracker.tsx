import React, { useState } from 'react';

export const WaterTracker: React.FC = () => {
    const [count, setCount] = useState(0);

    const drinkWater = () => {
        setCount(prev => prev + 1);
    };

    // Simple pixel art representation using CSS gradients or just text for now, 
    // but user asked for a "drawing". Let's try to make a CSS pixel art bottle.

    const fillHeight = Math.min(count * 20, 100); // 5 glasses to full

    return (
        <div className="water-tracker">
            <div className="bottle-container">
                <div className="bottle">
                    <div className="water" style={{ height: `${fillHeight}%` }}></div>
                </div>
                <div className="count">{count}</div>
            </div>
            <button className="pixel-btn water-btn" onClick={drinkWater}>
                Drink Water 💧
            </button>
        </div>
    );
};
