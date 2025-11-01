import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
    const { lang, setLang } = useLanguage();

    const handleLangChange = (event) => {
        setLang(event.target.value);
    };

    return (
        <select
            className="lang-switcher"
            onChange={handleLangChange}
            value={lang}
        >
            <option value="en">EN</option>
            <option value="hy">HY</option>
            <option value="ru">RU</option>
            <option value="nl">NL</option>
        </select>
    );
};

export default LanguageSwitcher;