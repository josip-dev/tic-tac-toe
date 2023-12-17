export enum BoardSign {
    Empty,
    X,
    O,
}

export const getBoardSign = (
    signValue: number | undefined,
    firstPlayerId: number
) => {
    if (!signValue) {
        return BoardSign.Empty;
    }

    if (signValue === firstPlayerId) {
        return BoardSign.X;
    }

    return BoardSign.O;
};
