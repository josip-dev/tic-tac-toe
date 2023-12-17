import { OptionHTMLAttributes } from 'react';

export enum GameStatus {
    Open = 'open',
    InProgress = 'progress',
    Finished = 'finished',
}

export const getGameStatusString = (status: GameStatus): string => {
    switch (status) {
        case GameStatus.Open:
            return 'Open';

        case GameStatus.InProgress:
            return 'In Progress';

        case GameStatus.Finished:
            return 'Finished';
    }
};

export const GAME_STATUS_DROPDOWN_OPTION_NONE: OptionHTMLAttributes<HTMLOptionElement> =
    {
        value: 'all',
        title: 'All',
    };

export const GAME_STATUS_DROPDOWN_OPTIONS: OptionHTMLAttributes<HTMLOptionElement>[] =
    [
        GAME_STATUS_DROPDOWN_OPTION_NONE,
        ...Object.keys(GameStatus).map((key) => {
            const statusKey = key as keyof typeof GameStatus;
            const status = GameStatus[statusKey];
            return {
                value: status,
                title: getGameStatusString(status),
            };
        }),
    ];
