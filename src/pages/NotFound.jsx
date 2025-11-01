import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const { t } = useLanguage();


    return (
        <div
            style={{
                textAlign: 'center',
                padding: '100px 20px',
                minHeight: '60vh',
                backgroundColor: '#f9f9f9'
            }}
        >
            <h1
                style={{
                    fontSize: '4rem',
                    color: '#8b0000',
                    marginBottom: '20px'
                }}
            >
                {t('NOT_FOUND_TITLE') || '404 - Page Not Found'}
            </h1>
            <p
                style={{
                    fontSize: '1.2rem',
                    marginBottom: '30px'
                }}
            >
                {t('NOT_FOUND_TEXT') || 'Sorry, the page you are looking for does not exist.'}
            </p>
            <Link
                to="/"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#f0e6e6',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s'
                }}
            >
                {t('GO_HOME') || 'Go to Home Page'}
            </Link>
        </div>
    );
};

export default NotFound;