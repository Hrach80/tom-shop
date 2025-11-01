import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";
import { useLanguage } from "../../hooks/useLanguage.jsx";
import CountdownTimer from "../../components/Offers/CountdownTimer.jsx";
import "./SpecialOffers.scss";

import { FaTruck, FaGift, FaBirthdayCake } from "react-icons/fa";

const offerCardsData = [
    {
        icon: FaGift,
        titleKey: "OFFER_TITLE_1",
        descKey: "OFFER_DESC_1",
        color: "#f44336",
    },
    {
        icon: FaTruck,
        titleKey: "OFFER_TITLE_2",
        descKey: "OFFER_DESC_2",
        color: "#00bcd4",
    },
    {
        icon: FaBirthdayCake,
        titleKey: "OFFER_TITLE_3",
        descKey: "OFFER_DESC_3",
        color: "#ffc107",
    },
];

const SpecialOffers = () => {
    const { t } = useLanguage();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- 🔹 Տվյալների ստացում Supabase-ից ---
    useEffect(() => {
        const fetchOffer = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("special_offers_config")
                .select("*")
                .eq("id", 1)
                .single();

            if (error) {
                console.error("Fetch error:", error);
            } else {
                setOffer(data);
                // 🔸 Եթե ժամկետը լրացել է՝ ջնջում ենք
                if (data && new Date(data.target_date) < new Date()) {
                    await supabase.from("special_offers_config").delete().eq("id", 1);
                    setOffer(null);
                }
            }
            setLoading(false);
        };

        fetchOffer();

        // Optional: Auto-refresh (յուրաքանչյուր 1 րոպե)
        const interval = setInterval(fetchOffer, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <section className="special-offers-page">
                <p className="loading-text">{t("LOADING")}...</p>
            </section>
        );
    }

    if (!offer) {
        return (
            <section className="special-offers-page">
                <h1 className="page-title">{t("SPECIAL_OFFERS")}</h1>
                <p className="no-offers-text">{t("NO_ACTIVE_OFFERS")}</p>
            </section>
        );
    }

    return (
        <section className="special-offers-page">
            <h1 className="page-title">{t("SPECIAL_OFFERS")}</h1>

            <div className="hero-offer-block">
                <div className="offer-image-wrapper">
                    <img
                        src={offer.hero_image_url}
                        alt={t("OFFER_SLOGAN_HERO")}
                        className="offer-image pulse-animation"
                    />
                </div>

                <div className="offer-content">
                    <p className="pre-title">{t("OFFER_PRE_TITLE_HERO")}</p>
                    <h2 className="offer-slogan">{t("OFFER_SLOGAN_HERO")}</h2>

                    <p className="discount-tag">
                        {offer.discount_percentage
                            ? `-${offer.discount_percentage}%`
                            : t("SPECIAL_DISCOUNT")}
                    </p>

                    <div className="timer-wrapper">
                        <p className="timer-text">{t("OFFER_TIMER_TEXT")}</p>
                        <CountdownTimer targetDate={offer.target_date} />
                    </div>

                    <a href="/menu" className="cta-button">
                        {t("ORDER_NOW")}
                    </a>
                </div>
            </div>

            <div className="offer-cards-grid">
                {offerCardsData.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="offer-card interactive-hover"
                            style={{ "--card-color": card.color }}
                        >
                            <Icon className="offer-card-icon" />
                            <h3>{t(card.titleKey)}</h3>
                            <p>{t(card.descKey)}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SpecialOffers;
