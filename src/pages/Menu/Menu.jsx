// src/pages/Menu/Menu.jsx (ՈՒՂՂՎԱԾ ԿՈԴ)

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { supabase } from '../../supabaseClient.js';
import logo from '/images/logo.png';
import ClockSpinner from '../../components/Loader/ClockSpinner.jsx';
import './Menu.scss';


const Menu = () => {
    const { t, lang } = useLanguage();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [animateClass, setAnimateClass] = useState('');
    const [flippedCardId, setFlippedCardId] = useState(null);
    const [orderMessage, setOrderMessage] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select(`
                id, 
                price, 
                image_url, 
                category, category_hy, category_ru, category_nl, 
                title_hy, title_en, title_ru, title_nl, 
                description_hy, description_en, description_ru, description_nl
            `)
            .order('created_at', { ascending: false });

        if (error) {
            setFetchError('Error fetching data: ' + error.message);
            setLoading(false);
            console.error(error);
        } else {
            setProducts(data);
            setLoading(false);
            setFetchError(null);
        }
    };

    useEffect(() => {
        fetchProducts();
        setAnimateClass('fade-in');
    }, []);


    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(item => item.category)));

        const cats = uniqueCategories.map(cat => {
            const item = products.find(i => i.category === cat);
            const labelKey = `category_${lang}`;

            return {
                key: cat,
                label: item ? (item[labelKey] || item.category) : cat
            };
        });

        return [
            { key: 'all', label: t('MENU_ALL') || 'All Products' },
            ...cats
        ];
    }, [products, lang, t]);


    const filteredItems = selectedCategory === 'all'
        ? products
        : products.filter(item => item.category === selectedCategory);


    const handleCategoryChange = (category) => {
        setAnimateClass('fade-out');
        setFlippedCardId(null);
        setTimeout(() => {
            setSelectedCategory(category);
            setAnimateClass('fade-in');
        }, 300);
    };

    const getTitle = (item) => item[`title_${lang}`] || item.title_en;
    const getDescription = (item) => item[`description_${lang}`] || item.description_en;

    const sendWhatsAppOrder = (item) => {
        const itemName = getTitle(item);
        const phone = t('WHATSAPP_NUMBER') || '+37494395221';

        let message = `*${t('FLIP_CARD_TITLE') || 'New Order Request'}*\n`;
        message += `------------------------\n`;
        message += `${t('MENU') || 'Product'}: ${itemName} (${item.category})\n`;
        message += `${t('ORDER_NOW') || 'Price'}: ${item.price.toLocaleString()} euro\n`;
        message += `\n${t('FLIP_CARD_MESSAGE') || 'Special Request'}:\n${orderMessage || t('NO_MESSAGE_PROVIDED') || 'No additional request provided.'}\n`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank');

        setFlippedCardId(null);
        setOrderMessage('');
    };

    const handleFlip = (id) => {
        setFlippedCardId(flippedCardId === id ? null : id);
        setOrderMessage('');
    };


    if (loading) {
        return (
            <section className="menu-page">
                <h1 className="menu-title">{t('MENU_TITLE') || 'Our Sweets Collection'}</h1>
                <div className="menu-loader-wrapper">
                    <ClockSpinner t={t} />
                </div>
            </section>
        );
    }

    if (fetchError) {
        return <section className="menu-page"><p className="error-text" style={{ color: 'red' }}>Սխալ տվյալների բեռնման ժամանակ: {fetchError}</p></section>;
    }

    return (
        <section className="menu-page">
            <h1 className="menu-title">{t('MENU_TITLE') || 'Our Sweets Collection'}</h1>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        className={`tab-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(cat.key)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className={`menu-list ${animateClass}`}>
                {filteredItems.map(item => (
                    <div
                        className={`menu-item-container ${flippedCardId === item.id ? 'flipped' : ''}`}
                        key={item.id}
                    >
                        <div className="menu-item-inner">
                            <div className="menu-item front">
                                <div className="item-image-wrapper">
                                    <img src={item.image_url} alt={getTitle(item)} className="item-image" />
                                </div>
                                <div className="item-details">
                                    <h3 className="item-title">{getTitle(item)}</h3>
                                    <p className="item-description">{getDescription(item)}</p>
                                    <div className="item-footer">
                                        <span className="item-price">{item.price.toLocaleString()} euro</span>
                                        <button
                                            className="order-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFlip(item.id);
                                            }}
                                        >
                                            {t('MENU_ORDER') || 'Order Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-item back">
                                <div className="back-content">
                                    <img src={logo} alt="Logo" className="back-logo" />
                                    <h4 className="back-title">{t('FLIP_CARD_TITLE')}</h4>
                                    <p className="back-message">{t('FLIP_CARD_MESSAGE')}</p>

                                    <textarea
                                        className="message-input"
                                        placeholder={t('FLIP_CARD_PLACEHOLDER') || 'Enter your special request here...'}
                                        value={orderMessage}
                                        onChange={(e) => setOrderMessage(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        rows="3"
                                    />

                                    <button
                                        className="send-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            sendWhatsAppOrder(item);
                                        }}
                                    >
                                        {t('SEND_ORDER') || 'Send Order via WhatsApp'}
                                    </button>

                                    <button
                                        className="cancel-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFlip(item.id);
                                        }}
                                    >
                                        {t('CANCEL') || 'Cancel'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Menu;