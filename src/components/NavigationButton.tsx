import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utilities/class-name-utilities';

export interface NavigationButtonProps extends PropsWithChildren {
    destination: string;
}

const NavigationButton = ({ destination, children }: NavigationButtonProps) => {
    return (
        <NavLink
            to={destination}
            className={({ isActive }) =>
                cn(
                    'text-lg text-cyan-600 hover:underline',
                    isActive
                        ? ' text-cyan-900 border-b border-cyan-900 pb-1'
                        : ''
                )
            }
        >
            {children}
        </NavLink>
    );
};

export default NavigationButton;
