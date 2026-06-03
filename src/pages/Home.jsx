import React from 'react'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return ( 
        <main className='min-h-[80vh] flex flex-col items-center justify-center text-center px-4 gap-8'>
            <span className="text-8xl">🎬</span>

            <div className="max-w-2xl space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                    Your personal <span className='text-[#a855f7]'>movie companion</span>
                </h1>
                <p className='text-xl text-gray-400 leading-relaxed'>
                    Discover trending films, search by title, save movies to your watchlist, and never forget what to watch next.
                </p>

            </div>

            <div className="flex gap-4 flex-wrap justify-center">
                <Button variant='primary' size='lg' onClick={() => navigate('/browse')}>
                    Browse Movies
                </Button>
                <Button variant='ghost' size='lg' onClick={() => navigate('/watchlist')}>
                    My Watchlist
                </Button>
                
            </div>

        </main>
    )
}

export default Home



// Tailwind CSS IntelliSense