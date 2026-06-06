import React from 'react'

const Badge = ({ label }) => {
    return (
        <span className='inline-block bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full'>
            {label}
        </span>
    )
}

export default Badge
