export type CardCategory = {
    category_name: string,
    category_code: string,
}

export type Card = {
    code: string,
    src: string,
    onlyDifficulty?: number
} & CardCategory