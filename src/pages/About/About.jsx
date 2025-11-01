import React, { useState } from 'react'; 
import { useLanguage } from '../../hooks/useLanguage';
import '../About/About.scss';



const AboutPage = () => {
    const { t } = useLanguage();
    const [showVideo, setShowVideo] = useState(false);
    const [activeVideo, setActiveVideo] = useState('');

    const handleVideoClick = (videoUrl) => {
        setActiveVideo(videoUrl);
        setShowVideo(true);
    };

    const handleCloseVideo = () => {
        setShowVideo(false);
        setActiveVideo('');
    };



    return (
        <section className="about-page">
            <h1 className="main-title" data-aos="fade-up">{t('ABOUT_TITLE')}</h1>
            <p className="mission-text" data-aos="fade-up" data-aos-delay="200">
                {t('MISSION_TEXT')}
            </p>
            <div className="partners-container">
                <div className="partner-card karen-catering" data-aos="fade-right">
                    <div className="logo-wrapper">
                        <img src="/images/karen.png" alt="Karen Catering Logo" className="partner-logo" />
                    </div>

                    <h2 className="partner-title">{t('KAREN_TITLE')}</h2>
                    <p className="tagline">{t('KAREN_TAGLINE')}</p>
                    <p className="description">{t('KAREN_DESC')}</p>
                    <p className="menu-info">{t('KAREN_MENU')}</p>
                    <div className="media-gallery">
                        <img
                            src="/images/karen.png"
                            alt="Catering Event"
                            className="gallery-item"
                            data-aos="zoom-in"
                        />
                        <button
                            className="video-btn"
                            onClick={() => handleVideoClick('/video/catring.mp4')}
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            Դիտել Պրոմո <span className="play-icon">▶</span>
                        </button>
                    </div>

                    <a href="https://www.karencatering.com" target="_blank" rel="noopener noreferrer" className="visit-btn">
                        Այցելել Կայք
                    </a>
                </div>
                <div className="partner-card mix-country" data-aos="fade-left">
                    <div className="logo-wrapper">
                        <img src="/images/Mix.png" alt="MIX Country Logo" className="partner-logo" />
                    </div>

                    <h2 className="partner-title">{t('MIX_TITLE')}</h2>
                    <p className="tagline">{t('MIX_TAGLINE')}</p>
                    <p className="description">{t('MIX_DESC')}</p>

                    <div className="media-gallery reverse">
                        <button
                            className="video-btn"
                            onClick={() => handleVideoClick('/video/mix.mp4')}
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            Խանութի Տեսահոլովակ <span className="play-icon">▶</span>
                        </button>
                        <img
                            src="/images/Mix.png"
                            alt="Store Interior"
                            className="gallery-item"
                            data-aos="zoom-in"
                        />
                    </div>

                    <div className="hot-food-highlight">
                        <span>🔥 {t('MIX_HOT_FOOD_KHOROVATS')}</span>
                    </div>

                    <a href="https://www.mixcountry.be" target="_blank" rel="noopener noreferrer" className="visit-btn">
                        Այցելել Խանութ
                    </a>
                </div>

            </div>

            {showVideo && activeVideo && (
                <div className="video-modal" onClick={handleCloseVideo}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleCloseVideo}>&times;</button>
                        <div className="video-responsive">
                            <video controls autoPlay key={activeVideo}>
                                <source src={activeVideo} type="video/mp4" />
                                Ձեր դիտարկիչը չի ապահովում վիդեո թեգը:
                            </video>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
};

export default AboutPage;