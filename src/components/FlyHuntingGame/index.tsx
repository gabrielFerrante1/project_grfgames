import { GameStatus, Level } from '@/types/Games';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import GameOverFlyHunting from '../../../public/images/bg_fly_hunting_game_over.png';
import IndexFlyHunting from '../../../public/images/bg_index_fly_hunting.png';
import WinFlyHunting from '../../../public/images/bg_win_fly_hunting.png';
import styles from './FlyHuntingGame.module.scss';

type Props = {
    setSubtitle: (text: string) => void
}

export default ({ setSubtitle }: Props) => {
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
    const [currentTime, setCurrentTime] = useState(40)
    const [maxHeartsAvailable, setMaxHeartsAvailable] = useState(6)
    const [currentHeartsAvailable, setCurrentHeartsAvailable] = useState(6)
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing')

    const levels: Level[] = [
        { name: 'Nível: Fácil', codename: 'easy', difficulty: 0 },
        { name: 'Nível: Médio', codename: 'average', difficulty: 1 },
        { name: 'Nível: Difícil', codename: 'hard', difficulty: 2 },
        { name: 'Nível: Muito Difícil', codename: 'extra_hard', difficulty: 3 }
    ];

    const handleAddFly = () => {
        const elementArea = document.querySelector(`.${styles.gameFlys}`)

        if (!elementArea) return;

        //Create Element Fly
        const elementFly = document.createElement('div')
        elementFly.style.backgroundImage = "url('/images/fly.png')"
        elementFly.style.backgroundSize = "contain"
        elementFly.style.backgroundRepeat = 'no-repeat'
        elementFly.style.position = 'relative'
        elementFly.style.top = `${Math.floor(Math.random() * 75)}%`
        elementFly.style.left = `${Math.floor(Math.random() * 90)}%`
        elementFly.style.width = `${Math.floor(Math.random() * (130 - 80 + 1)) + 80}px`
        elementFly.style.height = `${Math.floor(Math.random() * (130 - 80 + 1)) + 80}px`
        elementFly.className = 'fly-item'

        elementFly.onclick = (ev: globalThis.MouseEvent) => {
            const target = ev.target as HTMLDivElement;

            target.remove()
        }

        // Insert Fly On Area
        elementArea.appendChild(elementFly)
    }

    const playAgain = () => {
        setSubtitle('Selecione um nível de dificuldade para começar a jogar')
        setSelectedLevel(null)
        setCurrentTime(40)
        setMaxHeartsAvailable(6)
        setCurrentHeartsAvailable(6)
        setGameStatus('playing')
    }

    useEffect(() => {
        if (!selectedLevel || gameStatus != 'playing') return;

        let flyRange = 0

        setSubtitle('Corra e mate os mosquitos antes que eles desapareçam!')

        if (selectedLevel?.difficulty == 0) flyRange = 1900
        if (selectedLevel?.difficulty == 1) flyRange = 1500
        if (selectedLevel?.difficulty == 2) flyRange = 1000
        if (selectedLevel?.difficulty == 3) flyRange = 750

        //Create first fly
        handleAddFly()

        const timer = setInterval(() => {
            if (document.querySelector('.fly-item')) {
                document.querySelector('.fly-item')?.remove();
                setCurrentHeartsAvailable(heart => heart - 1)
            }

            //Create new fly
            handleAddFly();
        }, flyRange)

        return () => window.clearInterval(timer);
    }, [selectedLevel])

    useEffect(() => {
        if (!selectedLevel || gameStatus != 'playing') return;

        const timer = setInterval(() => {
            setCurrentTime(t => {
                if (t - 1 <= 0) {
                    window.clearInterval(timer)
                    return 0
                }
                return t - 1
            });
        }, 1000)

        return () => window.clearInterval(timer);
    }, [selectedLevel])

    useEffect(() => {
        if (currentTime <= 0 && currentHeartsAvailable >= 1) {
            setGameStatus('win')
            setSubtitle('Parabéns você ganhou 😀... Continue jogando para obter mais pontos!')
        } else if (currentTime <= 0 || currentHeartsAvailable <= 0) {
            setGameStatus('game_over')
            setSubtitle('Você perdeu 😢...Tente novamente!')
        }

    }, [currentHeartsAvailable, currentTime])

    return (
        <div id={styles.app} style={{ cursor: selectedLevel && gameStatus == 'playing' ? 'url("/images/racket.png") 0 10, auto' : 'auto' }}>
            <div className={styles.gameContainer}>
                {!selectedLevel && gameStatus == 'playing' &&
                    <div className={styles.gameLevelsContainer}>
                        <Image alt='IndexFlyHunting' width={380} src={IndexFlyHunting} />

                        <div>
                            <Dropdown
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.value)}
                                options={levels}
                                optionLabel="name"
                                placeholder="Selecione o nível"
                                style={{ width: 340 }}
                            />
                        </div>
                    </div>
                }

                {selectedLevel && gameStatus == 'playing' && <div className={styles.gameFlys} />}

                {selectedLevel && gameStatus == 'playing' &&
                    <div className={styles.gameData}>
                        <div className={styles.gameDataCard}>
                            <div className={styles.gameDataCardHearts}>
                                {[...Array(maxHeartsAvailable)].map((_item, key) => (
                                    <Icon
                                        key={key}
                                        icon="mdi:heart"
                                        className={`${styles.heartFilledIcon} ${currentHeartsAvailable <= key ? styles.heartNoFillIcon : ''}`}
                                    />
                                ))}
                            </div>
                            <div className={styles.gameDataCardTime}>
                                <span className={styles.gameDataCardTimeLabel}>Tempo restante: </span>
                                <span className={styles.gameDataCardTimeCount}>{currentTime}</span>
                            </div>
                        </div>
                    </div>
                }

                {gameStatus == 'game_over' ?
                    <div className={styles.gameOverContainer}>
                        <Image alt='GameOverFlyHunting' width={430} src={GameOverFlyHunting} />

                        <div>
                            <Button
                                label='Jogar novamente'
                                onClick={playAgain}
                            />
                        </div>
                    </div>
                    : gameStatus == 'win' ?
                        <div className={styles.gameWinerContainer}>
                            <Image alt='WinFlyHunting' width={400} src={WinFlyHunting} />

                            <div>
                                <Button
                                    label='Jogar novamente'
                                    onClick={playAgain}
                                />
                            </div>
                        </div>
                        : ''}
            </div>
        </div>
    )
}