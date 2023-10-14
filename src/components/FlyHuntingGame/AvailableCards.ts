import { Card, CardCategory } from "@/types/MemoryGame";

const categories: CardCategory[] = [
    { category_name: 'Programação', category_code: 'programming' },
    { category_name: 'Comida', category_code: 'foods' },
    { category_name: 'Objetos', category_code: 'objects' },
]

const cards: Card[] = [
    // Category - Programming
    { ...categories[0], code: 'angular', src: 'logos:angular-icon' },
    { ...categories[0], code: 'bootstrap', src: 'logos:bootstrap' },
    { ...categories[0], code: 'c-plusplus', src: 'logos:c-plusplus' },
    { ...categories[0], code: 'chrome', src: 'logos:chrome' },
    { ...categories[0], code: 'github', src: 'logos:github-icon' },
    { ...categories[0], code: 'javascript', src: 'logos:javascript' },
    { ...categories[0], code: 'react', src: 'logos:react' },
    { ...categories[0], code: 'php', src: 'logos:php' },
    { ...categories[0], code: 'python', src: 'logos:python' },
    { ...categories[0], code: 'vscode', src: 'devicon:vscode' },
    { ...categories[0], code: 'nodejs', src: 'logos:nodejs-icon' },
    { ...categories[0], code: 'laravel', src: 'logos:laravel' },

    // Category - Foods
    { ...categories[1], code: 'red-apple', src: 'noto-v1:red-apple' },
    { ...categories[1], code: 'pot-of-food', src: 'noto:pot-of-food' },
    { ...categories[1], code: 'grapes', src: 'noto-v1:grapes' },
    { ...categories[1], code: 'ear-of-corn', src: 'noto-v1:ear-of-corn' },
    { ...categories[1], code: 'hot-dog', src: 'noto-v1:hot-dog' },
    { ...categories[1], code: 'hot-beverage', src: 'noto-v1:hot-beverage' },
    { ...categories[1], code: 'hamburger', src: 'noto-v1:hamburger' },
    { ...categories[1], code: 'green-apple', src: 'noto-v1:green-apple' },
    { ...categories[1], code: 'bacon', src: 'noto-v1:bacon' },
    { ...categories[1], code: 'chocolate-bar', src: 'noto-v1:chocolate-bar' },
    { ...categories[1], code: 'carrot', src: 'noto-v1:carrot' },
    { ...categories[1], code: 'avocado', src: 'noto-v1:avocado' },

    //Category - Objects
    { ...categories[2], code: 'briefcase', src: 'noto-v1:briefcase' },
    { ...categories[2], code: 'calendar', src: 'noto-v1:calendar' },
    { ...categories[2], code: 'books', src: 'noto-v1:books' },
    { ...categories[2], code: 'crown', src: 'noto-v1:crown' },
    { ...categories[2], code: 'balance-scale', src: 'noto-v1:balance-scale' },

    { ...categories[2], code: 'hot-beverage', src: 'noto-v1:hot-beverage' },
    { ...categories[2], code: 'glasses', src: 'noto-v1:glasses' },
    { ...categories[2], code: 'drum', src: 'noto-v1:drum' },
    { ...categories[2], code: 'key', src: 'noto-v1:key' },
    { ...categories[2], code: 'headphone', src: 'noto-v1:headphone' },
    { ...categories[2], code: 'telescope', src: 'noto-v1:telescope' },
    { ...categories[2], code: 'handbag', src: 'noto-v1:handbag' }
]

export { cards, categories };