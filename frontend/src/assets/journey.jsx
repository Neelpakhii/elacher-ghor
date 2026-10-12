import { useEffect, useState } from "react";
import "./journey.css";

const API_URL = "http://localhost:4000";

const Journey = () => {
    const [section, setSection] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/navbar`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load the journey section.");
                }

                return response.json();
            })
            .then((data) => setSection(data.journey || null))
            .catch((error) => {
                console.error("Journey section error:", error);
            });
    }, []);

    if (!section) return null;

    const imageUrl = section.image?.startsWith("http")
        ? section.image
        : `${API_URL}${section.image || ""}`;

    return (
        <section className="journey-section">
            {section.image && (
                <img
                    className="journey-section__image"
                    src={imageUrl}
                    alt={section.imageAlt || ""}
                    loading="lazy"
                />
            )}

            <div className="journey-section__overlay" />

            <div className="journey-section__content">
                <h2>{section.heading}</h2>
                <p>{section.description}</p>

                {/* Always shown. Falls back to /about if the backend sends no link */}
                <a
                    className="journey-section__button"
                    href={section.buttonUrl || "/about"}
                >
                    {section.buttonText || "Know More"}
                </a>
            </div>
        </section>
    );
};

export default Journey;