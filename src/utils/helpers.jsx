const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export const buildImageUrl = (path) => {
    if(!path) return "https://placehold.co/500x750?text=No+Image"
    const base = imageBaseUrl || "https://image.tmdb.org/t/p/w500"

    return `${base}${path}`;
}

export const formatRating = (rating) => {
    const safeRating = rating ?? "N/A"
    return `⭐️ ${safeRating} / 10`;
}


export const truncateText = (text, maxLength=120) => {
    if(!text) return "";
    return text?.length > maxLength ? `${text?.slice(0, maxLength)}...` : text
}