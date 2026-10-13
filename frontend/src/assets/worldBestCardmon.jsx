import { useEffect, useState } from "react";
import { API_URL } from "../config";
import "./worldBestCardmon.css";

const WorldBestCardamom = () => {
    const [section, setSection] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/world-best-cardamom`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load the World’s Best Cardamom section.");
                }
                return response.json();
            })
            .then(setSection)
            .catch((error) => {
                console.error("World’s Best Cardamom error:", error);
            });
    }, []);

    if (!section) return null;

    const mediaUrl = (path) => {
        if (!path) return undefined;
        return path.startsWith("http") ? path : `${API_URL}${path}`;
    };

    return (
        <section className="world-best-cardamom">
            <div className="world-best-cardamom__video" aria-hidden="true">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={mediaUrl(section.poster)}
                    tabIndex="-1"
                >
                    <source src={mediaUrl(section.video)} type="video/mp4" />
                </video>
            </div>

            <div className="world-best-cardamom__overlay">
                <h2>{section.heading}</h2>
                <p>{section.description}</p>

                {section.buttonUrl && (
                    <a href={section.buttonUrl}>
                        {section.buttonText || "Read More"}
                    </a>
                )}
            </div>
        </section>
    );
};

export default WorldBestCardamom;