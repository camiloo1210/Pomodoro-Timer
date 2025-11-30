import React, { useState, useEffect } from 'react';

const TIPS = [
    "Look away from the screen every 20 minutes.",
    "Drink water! Stay hydrated.",
    "Stretch your back and shoulders.",
    "Blink often to avoid dry eyes.",
    "Stand up and walk around for a minute.",
    "Adjust your chair to support your lower back.",
    "Keep your screen at eye level.",
    "Take deep breaths to reduce stress."
];

interface HealthTipsProps {
    mode: 'WORK' | 'SHORT_BREAK' | 'LONG_BREAK';
}

export const HealthTips: React.FC<HealthTipsProps> = ({ mode }) => {
    const [tip, setTip] = useState('');

    useEffect(() => {
        if (mode !== 'WORK') {
            const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
            setTip(randomTip);
        }
    }, [mode]);

    if (mode === 'WORK') return null;

    return (
        <div className="health-tip">
            <p>💡 Tip: {tip}</p>
        </div>
    );
};
