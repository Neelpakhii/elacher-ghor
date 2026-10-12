import { useEffect, useState } from "react";
import ProductCard from "./productCard.jsx";
import "./productSection.css";

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load products.");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="product-section" id="products">
            <div className="product-section__header">
                <h2>Elacher Ghor’s Premium Quality Cardamom</h2>
            </div>

            {loading && <p>Loading products...</p>}

            {!loading && error && <p role="alert">{error}</p>}

            {!loading && !error && products.length === 0 && (
                <p>No products are available right now.</p>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="product-section__grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductSection;