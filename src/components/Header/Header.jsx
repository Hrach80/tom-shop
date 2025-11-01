import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.scss';

const navItems = [
    { key: 'HOME', path: '/' },
    { key: 'MENU', path: '/menu' },
    { key: 'SPECIAL_OFFERS', path: '/offers' },
    { key: 'CONTACT', path: '/contact' },
];

const Header = () => {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="main-header">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img
                            src="/images/logo.png"
                            alt="Bakery Logo"
                            className="logo-img"
                        />
                    </Link>
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.key}>
                            <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                                {t(item.key)}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <LanguageSwitcher />
                    </li>
                </ul>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </nav>
        </header>
    );
};

export default Header;