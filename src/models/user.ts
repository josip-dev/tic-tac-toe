export interface UserLoginData {
    id: number;
    username: string;
    token: string;
}

export interface User {
    id: number;
    username: string;
}

export interface UserData extends User {
    game_count: number;
    win_rate: number;
}
