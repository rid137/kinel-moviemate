import React, { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

export default function useMovies(query = "") {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchMovies = async () => {
            setLoading(true);
            setError(null);

            try {
                const moviesUrl = query ?
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
                    :
                    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`

                    // const 
                    // const movies = await fetch(moviesUrl);
                    // const genres = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)

                    // Better approach
                    const [movieRes, genresRes] = await Promise.all([
                        fetch(moviesUrl),
                        fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
                    ])

                    if(!movieRes.ok) throw new Error(`API error: ${movieRes.status}`)

                    const moviesData = await movieRes.json();
                    const genresData = await genresRes.json();

                    // console.log("moviesData", moviesData)
                    // console.log("genresData", genresData)

                    setMovies(moviesData.results)
                    setGenres(genresData.genres)

                    setLoading(false);

            } catch (error) {
                setError(error.message || "Error to load movies. Please try again.")
                setLoading(false)
            }
        }

        fetchMovies();
    }, [query])


    return { movies, genres, loading, error }
}
