import { useState, useEffect } from 'react';

export default function CountdownTimer({ time }) {
    const [timeLeft, setTimeLeft] = useState(time * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60) < 10 ? '0' + (timeLeft % 60) : timeLeft % 60}
        </div>
    )
}