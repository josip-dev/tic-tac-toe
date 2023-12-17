import { DateTime } from 'luxon';
import { User } from './user';
import { GameStatus } from '../constants/game-status';

export interface Game {
    id: number;
    board: Array<Array<number | undefined>>;
    winner: User;
    first_player: User;
    second_player: User;
    created: DateTime;
    status: GameStatus;
}
