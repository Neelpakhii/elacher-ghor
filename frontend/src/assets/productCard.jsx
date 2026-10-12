import "./productCard.css";

const ProductCard = ({ product }) => {
    const imageSrc = product.image
        ? product.image.startsWith("http")
            ? product.image
            : `http://localhost:4000${product.image}`
        : "";

    return (
        <article className="product-card">
            <div className="product-card__image-wrap">
                {imageSrc ? (
                    <img
                        className="product-card__image"
                        src={imageSrc}
                        alt={product.imageAlt || product.name}
                        loading="lazy"
                    />
                ) : (
                    <div
                        className="product-card__placeholder"
                        aria-label="Product image will be added"
                    >
                        Product image
                    </div>
                )}
            </div>

            <div className="product-card__content">
                <p className="product-card__eyebrow">
                    Alleppey Premium Cardamom
                </p>

                <h3 className="product-card__name">
                    {product.name}
                </h3>

                {product.price != null && (
                    <p className="product-card__price">
                        From Rs. {Number(product.price).toFixed(2)}

                        {product.originalPrice != null && (
                            <span className="product-card__original-price">
                                Rs. {Number(product.originalPrice).toFixed(2)}
                            </span>
                        )}
                    </p>
                )}

                {product.href && (
                    <a
                        className="product-card__link"
                        href={product.href}
                    >
                        View product <span aria-hidden="true">→</span>
                    </a>
                )}
            </div>
        </article>
    );
};

export default ProductCard;