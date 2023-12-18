import { IconCircle, IconX } from '@tabler/icons-react';
import { BoardSign } from '../constants/board-sign';
import { cn } from '../utilities/class-name-utilities';

export interface BoardSquareProps {
    sign: BoardSign;
    rowIndex: number;
    columnIndex: number;
    makeMove: (payload?: unknown) => Promise<undefined>;
}

const SIZE = 64;

const BoardSquare = ({
    sign,
    rowIndex,
    columnIndex,
    makeMove,
}: BoardSquareProps) => {
    let icon: JSX.Element | undefined = undefined;
    switch (sign) {
        case BoardSign.X:
            icon = <IconX size={SIZE} />;
            break;

        case BoardSign.O:
            icon = <IconCircle size={SIZE} />;
            break;

        default:
            icon = undefined;
            break;
    }

    const canActivate = !icon;

    return (
        <div
            onClick={async () => {
                if (!canActivate) {
                    return;
                }

                await makeMove({
                    row: rowIndex,
                    col: columnIndex,
                });
            }}
            className={cn(
                `w-1/3 p-2 shadow-md hover:shadow-xl flex justify-center items-center`,
                canActivate
                    ? 'hover:cursor-pointer'
                    : 'hover:cursor-not-allowed'
            )}
        >
            {icon}
        </div>
    );
};

export default BoardSquare;
