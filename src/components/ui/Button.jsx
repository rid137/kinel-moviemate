import clsx from 'clsx'

const Button = ({
    children,
    variant = 'primary',
    size= "md",
    onClick,
    disabled = false,
    type = "button",
    className=" "

}) => {
    const variantClasses = {
        primary: "bg-[#a855f7] hover:bg-[#9333ea] text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        ghost: "bg-transparent border border-gray-500 hover:bg-gray-100 text-gray-500",
    }

    const sizeClasses = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={
                clsx(
                    "inline-flex items-center justify-center font-semibold rounded-lg",
                    "transition-colors, duration-200 focus:outline-none focus:ring-2 focus:ring-[#a855f7]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    // Dynamic classes driven by props
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )
            }
        >
            {children}
        </button>
    )
}

export default Button
