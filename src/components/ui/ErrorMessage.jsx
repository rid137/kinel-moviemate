import React from 'react'
import Button from './Button'

const ErrorMessage = ({ message = "Something went wrong.", onRetry }) => {
    return (
        <div className='flex flex-col items-center justify-center py-20 gap-4 text-center'>
            <span className="text-5xl">☹️</span>
            <p className="text-red-400 font-medium">{message}</p>

            {
                onRetry && (
                    <Button variant='secondary' onClick={onRetry}>
                        Try Again
                    </Button>
                )
            }
        </div>
    )
}

export default ErrorMessage
