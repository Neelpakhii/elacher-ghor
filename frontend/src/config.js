const rawUrl =
    import.meta.env.VITE_API_URL || "https://elacher-ghor-api.vercel.app";

export const API_URL = rawUrl.replace(/\/+$/, "");
export const ABOUT_URL = `${API_URL}/about`;

// Builds a full image URL from a path like "/images/logo.png"
export const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `${API_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};