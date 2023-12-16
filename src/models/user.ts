export interface UserLoginData {
    id: number;
    username: string;
    token: string;
}

export interface User {
    id: number;
    username: string;
    game_count: number;
    win_rate: number;
}
