

import React from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import '../Contact/Contact.scss';

// --- REACT ICONS ՆԵՐՄՈՒԾՈՒՄՆԵՐԸ ---
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt, 
    FaViber,
    FaWhatsapp,
    FaTelegramPlane,
    FaFacebookF,
    FaInstagram,
    FaTiktok
} from 'react-icons/fa';


import founderImage from '/images/himn.png';
import mixLogo from '/images/Mix.png'; 
import karenLogo from '/images/karen.png'; 


const socialLinks = [
    { name: 'Viber', icon: FaViber, color: '#7360F2', key: 'LINK_VIBER' },
    { name: 'WhatsApp', icon: FaWhatsapp, color: '#25D366', key: 'LINK_WHATSAPP' },
    { name: 'Telegram', icon: FaTelegramPlane, color: '#0088CC', key: 'LINK_TELEGRAM' },
    { name: 'Facebook', icon: FaFacebookF, color: '#1877F2', key: 'LINK_FACEBOOK' },
    { name: 'Instagram', icon: FaInstagram, color: '#C13584', key: 'LINK_INSTAGRAM' },
    { name: 'TikTok', icon: FaTiktok, color: '#000000', key: 'LINK_TIKTOK' },
];

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section className="contact-page">
            <h1 className="contact-title">{t('CONTACT_TITLE')}</h1>
            <div className="founder-section">
                <div className="founder-info">
                    <img src={founderImage} alt={t('CONTACT_FOUNDER_NAME')} className="founder-img" />
                    <h2>{t('CONTACT_FOUNDER_NAME')}</h2>
                    <p className="position">{t('CONTACT_FOUNDER_POSITION')}</p>

                    <div className="slogan-wrapper">
                        <p className="slogan animate-slogan">
                            {t('CONTACT_SLOGAN_BIG') || 'Արդեն 10 տարի շուկայում!'}
                        </p>
                    </div>
                </div>

                <div className="contact-details">
                    <div className="detail-item">
                        <FaPhoneAlt />
                        <a href={`tel:${t('LINK_PHONE')}`}>{t('CONTACT_MAIN_PHONE')}</a>
                        
                    </div>
                    <div className="detail-item">
                        <FaEnvelope />
                        <a href={`mailto:${t('LINK_EMAIL')}`}>{t('CONTACT_MAIN_EMAIL')}</a>
                    </div>

                    <div className="detail-item address-item">
                        <FaMapMarkerAlt />
                        <p>{t('CONTACT_MAIN_ADDRESS') || 'Հայաստան, Երևան, Կոմիտասի պող. 49'}</p>
                    </div>
                </div>
            </div>

            <div className="map-and-address-section">
                <h3>{t('CONTACT_SECTION_MAP')}</h3>
                <div className="map-grid">
                    <div className="map-container">
                        <iframe
                            src={t('LINK_GOOGLE_MAPS')}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Our Location"
                        ></iframe>
                    </div>
                    <div className="address-card">
                        <FaMapMarkerAlt className="address-icon-large" />
                        <h4>{t('FIND_US_HERE') || 'ԳՏԵՔ ՄԵԶ ԱՅՍՏԵՂ'}</h4>
                        <p className="address-text">
                            {t('CONTACT_MAIN_ADDRESS_FULL') || 'Հայաստան, Երևան, Կոմիտասի պողոտա 49 (Երկրորդ տող, կոնկրետ հարկ/մուտք)'}
                        </p>
                        <a
                            href={t('LINK_GOOGLE_MAPS_DIRECTION') || 'https://maps.app.goo.gl/example'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="direction-btn"
                        >
                            {t('GET_DIRECTIONS') || 'Ստանալ ուղղություններ'}
                        </a>
                    </div>
                </div>
            </div>
            <div className="social-section">
                <h3>{t('CONTACT_SECTION_SOCIAL')}</h3>
                <div className="social-links">
                    {socialLinks.map((link) => {
                        const IconComponent = link.icon;
                        return (
                            <a
                                key={link.name}
                                href={t(link.key)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-link interactive-hover" 
                                style={{ '--icon-color': link.color }}
                            >
                                <IconComponent className="social-icon" />
                                <span>{link.name}</span>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="partners-section">
                <h3>{t('CONTACT_SECTION_PARTNERS')}</h3>
                <div className="partner-logos">
                    <img src={mixLogo} alt="Mix Country Logo" className="partner-logo interactive-hover" />
                    <img src={karenLogo} alt="Karen Catering Logo" className="partner-logo interactive-hover" />
                </div>
            </div>
        </section>
    );
};

export default Contact;