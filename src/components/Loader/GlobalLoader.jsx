
import React, { useState, useEffect } from 'react';
import ClockSpinner from './ClockSpinner.jsx';
import { useLanguage } from "../../hooks/useLanguage.jsx"; 

const GlobalLoader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="global-loader-overlay">
                <ClockSpinner />
            </div>
        );
    }

    return children;
};

export default GlobalLoader;