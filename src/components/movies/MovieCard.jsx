import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { buildImageUrl, formatRating, truncateText } from '../../utils/helpers';


const MovieCard = ({ movie, genres=[], onAddWatchlist, isInWatchlist=false }) => {
    // console.log("genres", genres)
    const [justAdded, setJustAdded] = useState(false);

    const { id, title, overview, poster_path, vote_average, genre_ids=[] } = movie;

    const genreNames = genre_ids
        ?.map((gid) => genres?.find((genre) => genre.id === gid)?.name).filter(Boolean);

    // console.log("genreNames", genreNames)


    return (
        <div className='bg-gray-900 rounded-xl overflow-hidden flex flex-col group hover:ring-2 hover:ring-brand-500 transition-all duration-200'>

            <Link
                to={`/movies/${id}`}
                className='block relative overflow-hidden'
            >
                <img 
                    src={buildImageUrl(poster_path)}
                    alt={`${title} poster`}
                    className='w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300'
                    loading='lazy'
                />


                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-sm font-bold px-2 py-1 rounded-lg">
                    {formatRating(vote_average)}
                </div>
            </Link>

            {/* Card body */}
            <div className="p-4 flex flex-col flex-1 gap-3">

                <Link tto={`/movies/${id}`}>
                    <h3 className='font-semibold text-lg leading-tight hover:text-brand-500 transition-colors line-clamp-2'>
                        {title}
                    </h3>
                </Link>

                {
                    genreNames?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {genreNames?.map((name) => (
                                <Badge key={name} label={name} />
                            ))}
                        </div>
                    )
                }

                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {truncateText(overview)}
                </p>


                {
                    isInWatchlist ? (
                        <Button variant='ghost' size='sm' disabled>
                            ✓ Saved to Watchlist
                        </Button>
                    ) : (
                        <Button
                            variant={justAdded ? "secondary": "primary"}
                            size='sm'
                            // onClick={handleWatchlistClick}
                        >
                            {justAdded ? "Added! ✓" : "+ Watchlist"}
                        </Button>
                    )
                }
            </div>
            
        </div>
    )
}

export default MovieCard
