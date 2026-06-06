import React, { useState } from 'react'
import Button from '../ui/Button';

const MovieSearch = ({ onSearch, isLoading=false }) => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!query.trim()) {
            setError("Please enter a movie title to search.")
            return;
        }

        setError("");
        onSearch(query.trim());
    }


    const handleClear = () => {
        setQuery("");
        setError("");
        onSearch("");
    }

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-2xl'>
            <div className="flex gap-2">

                <div className="flex-1 relative">
                    <input 
                        type='text'
                        value={query}
                        onChange={handleChange}
                        placeholder='Search for a movie...'
                        disabled={isLoading}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent
                           focus:ring-brand-500 disabled:opacity-50 transition-all"
                    />

                    {
                        query && (
                            <button
                                type='button'
                                onClick={handleClear}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white transition-colors'
                            >
                                X
                            </button>
                        )
                    }
                </div>


                <Button
                    type='submit'
                    variant='primary'
                    disabled={isLoading}
                >
                    {isLoading ? "Searching..." : "Search"}
                </Button>
            </div>


            {
                error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                )
            }
            
        </form>
    )
}

export default MovieSearch
