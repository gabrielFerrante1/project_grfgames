export enum GamesAvailable {
    WORDS = 'Hunting_Words',
    TTTOE = 'Tic_Tac_Toe',
    MEMORY = 'Memory',
    FLY_HUNT = 'Fly_Hunting'
}

export type Level = {
    name: string,
    codename: string,
    difficulty: number
}

export type GameStatus = 'playing' | 'win' | 'game_over'
