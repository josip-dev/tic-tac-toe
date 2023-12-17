import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../utilities/class-name-utilities';

export interface ButtonProps
    extends PropsWithChildren,
        ButtonHTMLAttributes<HTMLButtonElement> {
    id?: string;
    icon?: JSX.Element;
    fullWidth?: boolean;
    secondary?: boolean;
}

const Button = ({
    children,
    icon,
    fullWidth,
    secondary,
    className,
    ...otherButtonProps
}: ButtonProps) => {
    return (
        <button
            className={cn(
                secondary
                    ? 'bg-transparent hover:bg-cyan-100 text-cyan-950 border border-cyan-900'
                    : 'bg-cyan-700 hover:bg-cyan-800 text-cyan-100',
                'py-2 rounded focus:ring-2 focus:outline-none focus:ring-cyan-400',
                !icon
                    ? `font-medium px-4 text-center${
                          fullWidth ? ' w-full' : ''
                      }`
                    : 'font-bold px-2 border border-cyan-700',
                className
            )}
            {...otherButtonProps}
        >
            {icon || children}
        </button>
    );
};

export default Button;
