import { PropsWithChildren } from 'react';
import { cn } from '../utilities/class-name-utilities';

export interface ErrorProps extends PropsWithChildren {
    header?: string;
    error?: string;
    classes?: string;
    handled?: boolean;
}

const Error = ({ header, error, classes, handled, children }: ErrorProps) => {
    return (
        error && (
            <div className={cn('flex flex-col gap-1', classes)}>
                {header && <h2 className="text-red-500 text-sm">{header}</h2>}
                {!handled && (
                    <p className="text-red-500 text-md font-semibold italic">
                        {error}
                    </p>
                )}
                {children}
            </div>
        )
    );
};

export default Error;
