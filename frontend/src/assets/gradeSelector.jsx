import { useEffect, useState } from "react";
import "./gradeSelector.css";

const API_URL = "http://localhost:4000";

const GradeSelector = () => {
    const [section, setSection] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/grade-selector`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load cardamom grades.");
                }
                return response.json();
            })
            .then((data) => {
                setSection(data?.heading ? data : null);
            })
            .catch((error) => {
                console.error("Grade selector error:", error);
            });
    }, []);

    if (!section) return null;

    const imageUrl = (image) => {
        if (!image) return "";
        return image.startsWith("http") ? image : `${API_URL}${image}`;
    };

    return (
        <section
            id="grade-selector"
            className="grade-selector"
            aria-labelledby="grade-selector-title"
        >
            <div className="grade-selector__intro">
                <h2 id="grade-selector-title">{section.heading}</h2>
                <p>{section.description}</p>
            </div>

            <div className="grade-selector__grid">
                {Array.isArray(section.grades) &&
                    section.grades.map((grade) => (
                        <a
                            className="grade-selector__item"
                            href={grade.href || "#products"}
                            key={grade.id}
                        >
                            {grade.image && (
                                <img
                                    className="grade-selector__image"
                                    src={imageUrl(grade.image)}
                                    alt={grade.imageAlt || grade.name}
                                    loading="lazy"
                                />
                            )}
                            <h3>{grade.name}</h3>
                        </a>
                    ))}
            </div>

            {section.buttonUrl && (
                <a
                    className="grade-selector__button"
                    href={section.buttonUrl}
                >
                    {section.buttonText ||
                        "Setting standards for others to follow"}
                </a>
            )}
        </section>
    );
};

export default GradeSelector;