import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLanguage } from '../../hooks/useLanguage';
import './Hero.scss';

const Hero = () => {
    const { t } = useLanguage();
    const navigate = useNavigate(); 
    const handleOrderNow = () => {
        navigate('/menu');
    };
    const handleViewOffers = () => {
        navigate('/About');
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="main-message">
                    <h1 className="title-text">{t('DELIGHT_TITLE')}</h1>
                    <p className='text-title'>{t('TEXT_TITLE')}</p>
                    <button
                        className="btn primary-btn"
                        onClick={handleOrderNow} 
                    >
                        {t('ORDER_NOW')}
                    </button>
                    <button
                        className="btn secondary-btn"
                        onClick={handleViewOffers} 
                    >
                        {t('OTHER_NOW')}
                    </button>
                </div>

            
            </div>
        </section>
    );
};

export default Hero;