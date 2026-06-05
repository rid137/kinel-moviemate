import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();


    
    return (
        <main className='min-h-[80vh] flex flex-col items-center justify-center text-center px-4 gap-6'>
            <span className='text-8xl'>🎬</span>
            <h1 className="text-6xl font-bold text-brand-600">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-gray-400 max-w-sm">Looks like this scene got cut from the script. The page you're looking for doesn't exist.</p>

            <div className="flex gap-4">
                <Button variant='primary' onClick={() => navigate("/home")}>
                    Go Home
                </Button>

                <Button variant='ghost' onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </div>
            
        </main>
    )
}

export default NotFound
