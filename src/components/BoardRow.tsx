import { getBoardSign } from '../constants/board-sign';
import BoardSquare from './BoardSquare';

export interface BoardRowProps {
    rowIndex: number;
    row: Array<number | undefined>;
    firstPlayerId: number;
    makeMove: (payload?: unknown) => Promise<undefined>;
}

const BoardRow = ({
    rowIndex,
    row,
    firstPlayerId,
    makeMove,
}: BoardRowProps) => {
    return (
        <div className="flex gap-5 my-5">
            {row.map((value, index) => {
                const sign = getBoardSign(value, firstPlayerId);
                return (
                    <BoardSquare
                        key={`Row[${rowIndex}]Sign[${index}]`}
                        rowIndex={rowIndex}
                        columnIndex={index}
                        sign={sign}
                        makeMove={makeMove}
                    />
                );
            })}
        </div>
    );
};

export default BoardRow;
