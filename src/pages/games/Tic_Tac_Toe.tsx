 
import TicTacToe from '@/components/TicTacToe';
import styles from '@/styles/TicTacToe.module.scss'
import { Pixelify_Sans } from 'next/font/google';
import { useState } from 'react';

const pixelify = Pixelify_Sans({ subsets: ['latin'] })

const Game = () => {
    const [textSubtitle, setTextSubtitle] = useState('Selecione um nível de dificuldade para começar a jogar')

    return (
        <div id={styles.app}>
            <div className={styles.header}>
                <span className={`${styles.headerTitle} ${pixelify.className}`}>Jogo da Velha</span>

                <p className={styles.headerSubtitle}>{textSubtitle}</p>
            </div>

            <div className={styles.gameContainer}>
                <TicTacToe
                    setSubtitle={setTextSubtitle}
                />
            </div>
        </div>
    )
}

export default Game;