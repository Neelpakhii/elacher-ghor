import { useEffect, useState } from "react";
import "./chefSection.css";

const API_URL = "http://localhost:4000";

const ChefSection = () => {
    const [chef, setChef] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/navbar`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load the chef section.");
                }
                return response.json();
            })
            .then((data) => setChef(data.chefSection || null))
            .catch((error) => console.error("Chef section error:", error));
    }, []);

    if (!chef) return null;

    const imageSrc = chef.image
        ? chef.image.startsWith("http")
            ? chef.image
            : `${API_URL}${chef.image}`
        : "";

    return (
        <section className="chef-section">
            <div className="chef-section__content">
                <h2>{chef.heading}</h2>

                <p>{chef.description}</p>

                {chef.quote && (
                    <blockquote className="chef-section__quote">
                        “{chef.quote}”
                    </blockquote>
                )}

                {chef.buttonUrl && (
                    <a className="chef-section__button" href={chef.buttonUrl}>
                        {chef.buttonText || "BUY NOW"}
                    </a>
                )}
            </div>

            {imageSrc && (
                <div className="chef-section__image-wrap">
                    <img
                        className="chef-section__image"
                        src={imageSrc}
                        alt={chef.imageAlt || chef.heading}
                        loading="lazy"
                    />
                </div>
            )}
        </section>
    );
};

export default ChefSection;