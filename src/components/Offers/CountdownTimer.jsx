import React, { useState, useEffect } from 'react';
// import './CountdownTimer.scss'; // Ավելացրեք SCSS ֆայլ, եթե ցանկանում եք ոճավորում

const calculateTimeLeft = (targetDate) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 1000) { // Պաշտպանություն՝ որպեսզի չշարունակի հաշվել
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    // Հայերեն թարգմանությունները ժամանակաչափի համար
    const labels = {
        days: 'Օր',
        hours: 'Ժամ',
        minutes: 'Րոպե',
        seconds: 'Վրկ',
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(newTimeLeft);

            if (Object.keys(newTimeLeft).length === 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        const value = String(timeLeft[interval]).padStart(2, '0');

        return (
            <span key={interval} className="timer-unit">
                <span className="timer-value">{value}</span>
                <span className="timer-label">{labels[interval] || interval}</span>
            </span>
        );
    });

    return (
        <div className={`countdown-timer ${timerComponents.length ? 'active' : 'expired'}`}>
            {timerComponents.length ? (
                timerComponents
            ) : (
                <span className="expired-message">Առաջարկն Ավարտված է!</span>
            )}
        </div>
    );
};

export default CountdownTimer;