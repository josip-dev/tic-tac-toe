import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavigationButtonProps extends PropsWithChildren {
    destination: string;
}

const BASE_CLASS_NAMES =
    'text-lg text-cyan-900 dark:text-cyan-500 hover:underline';

const NavigationButton = ({ destination, children }: NavigationButtonProps) => {
    return (
        <NavLink
            to={destination}
            className={({ isActive }) =>
                `${BASE_CLASS_NAMES}${isActive ? ' text-violet-800' : ''}`
            }
        >
            {children}
        </NavLink>
    );
};

export default NavigationButton;
