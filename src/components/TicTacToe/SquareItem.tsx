import { Icon } from "@iconify/react";
import { HTMLAttributes } from 'react'
import styles from './TicTacToe.module.scss';
import { GameData } from "@/types/FlyHuntingGame";

type SquareItemProps = {
    row: number,
    collumn: 1 | 2 | 3,
    gameData: GameData,
    attributes?: HTMLAttributes<HTMLDivElement>
}

export default ({ row, collumn, gameData, attributes }: SquareItemProps) => { 
    const iconActive = row == 1 ? gameData.line1[collumn] : row == 2 ? gameData.line2[collumn] : row == 3 ? gameData.line3[collumn] : -1;
    
    return (
        <div className={styles.gameContainerSquare} {...attributes}>
            {iconActive == 0 ?
                <Icon icon="line-md:circle" className={styles.gameCircleIcon} />
                : iconActive == 1 ?
                    <Icon icon="line-md:close-small" className={styles.gameXIcon} />
                    : ''
            }
        </div>
    )
}