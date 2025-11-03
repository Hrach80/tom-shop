

import React from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

import './Footer.scss';
import logo from '/images/logo.png'; 

const Footer = () => {
    const { t } = useLanguage();
    const CONTACT_INFO = {
        phone: "+374 99 999 999",
        address: t('FOOTER_ADDRESS') || "Երևան, Հայաստան",
        email: "info@yourbakery.am"
    };

    const navLinks = [
        { path: '/menu', label: t('MENU') || 'Menu' },
        { path: '/about', label: t('ABOUT_US') || 'About Us' },
        { path: '/offers', label: t('SPECIAL_OFFERS') || 'Offers' },
        { path: '/delivery', label: t('DELIVERY') || 'Delivery' },
    ];

    return (
        <footer className="footer-main">
            <div className="footer-container">
                <div className="footer-section brand-info">
                    <img src={logo} alt="Brand Logo" className="footer-logo" />
                    <p className="footer-slogan">
                        {t('FOOTER_SLOGAN') || "Քաղցրացրեք Ձեր օրը մեր նրբագեղ քաղցրավենիքներով։"}
                    </p>
                    <div className="social-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF className="social-icon" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href={`https://wa.me/${CONTACT_INFO.phone.replace(/[\s\+]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <FaWhatsapp className="social-icon" />
                        </a>
                    </div>
                </div>

                <div className="footer-section quick-links">
                    <h4 className="section-title">{t('FOOTER_QUICK_LINKS') || "Օգտակար Հղումներ"}</h4>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <a href={link.path} className="footer-link">{link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer-section contact-info">
                    <h4 className="section-title">{t('FOOTER_CONTACT') || "Կապ"}</h4>
                    <p>
                        <FaPhoneAlt className="contact-icon" />
                        <a href={`tel:${CONTACT_INFO.phone}`} className="footer-link">{CONTACT_INFO.phone}</a>
                    </p>
                    <p>
                        <FaMapMarkerAlt className="contact-icon" />
                        {CONTACT_INFO.address}
                    </p>
                    <p>
                        <span className="email-text">Email: {CONTACT_INFO.email}</span>
                    </p>
                </div>

            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {t('FOOTER_COPYRIGHT_BRAND') || "Your Bakery Name"}. {t('FOOTER_ALL_RIGHTS') || "Բոլոր իրավունքները պաշտպանված են։"}</p>
            </div>
        </footer>
    );
};

export default Footer;