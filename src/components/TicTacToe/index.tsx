import { GameData } from '@/types/FlyHuntingGame'
import { GameStatus, Level } from '@/types/Games'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { ListBox } from 'primereact/listbox'
import { useEffect, useState } from 'react'
import GameOver from '../../../public/images/game_over.png'
import Win from '../../../public/images/win.png'
import SquareItem from './SquareItem'
import styles from './TicTacToe.module.scss'

type Props = {
    setSubtitle: (value: string) => void
}

export default ({ setSubtitle }: Props) => {
    const levels: Level[] = [
        { name: 'Nível: Fácil', codename: 'easy', difficulty: 0 },
        { name: 'Nível: Médio', codename: 'average', difficulty: 1 },
        { name: 'Nível: Difícil', codename: 'hard', difficulty: 2 }
    ];

    const gameDataDefault = {
        line1: {
            1: -1, 2: -1, 3: -1
        },
        line2: {
            1: -1, 2: -1, 3: -1
        },
        line3: {
            1: -1, 2: -1, 3: -1
        },
    }

    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
    const [playerTurn, setPlayerTurn] = useState<'X' | 'O' | null>(null)
    const [gameData, setGameData] = useState<GameData>(gameDataDefault)


    const handlePlayAgain = () => {
        setSubtitle('Selecione um nível de dificuldade para começar a jogar')
        setSelectedLevel(null)
        setGameStatus('playing')
        setPlayerTurn(null)
        setGameData(gameDataDefault)
    }

    const handleWinner = () => {
        setSubtitle('Parabéns você ganhou 😀... Continue jogando para obter mais pontos!')
        setGameStatus('win')
    }

    const handleGameOver = () => {
        setSubtitle('Você perdeu 😢... Tente novamente!')
        setGameStatus('game_over')
    }

    const handleDraw = () => { 
        setSubtitle('Empate 😢... Tente novamente!')
        setGameStatus('game_over')
    }

    const handleSetSquare = (row: 1 | 2 | 3, collumn: 1 | 2 | 3, iconName: 'X' | 'O') => {
        if (handleIsSettedPosition(row, collumn)) return;

        const iconNumber = iconName == 'X' ? 1 : 0;
        const lineData = row == 1 ? gameData.line1 : row == 2 ? gameData.line2 : row == 3 ? gameData.line3 : {};
        const lineLabel = `line${row}`;

        setGameData((gData) => ({ ...gData, [lineLabel]: { ...lineData, [collumn]: iconNumber } }))

        if (iconNumber == 1) {
            setTimeout(() => {
                setPlayerTurn('O')
            }, 400)
        }
    }

    const handleIsSettedPosition = (row: 1 | 2 | 3, collumn: 1 | 2 | 3) => {
        const lineData = row == 1 ? gameData.line1 : row == 2 ? gameData.line2 : row == 3 ? gameData.line3 : {};

        if (lineData[collumn] != -1) return true

        return false
    }

    const handlePlayAuto = () => {
        const randomRow = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3
        const randomCol = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3

        if (selectedLevel?.codename != 'easy' && Object.values(gameData.line1).includes(0)) {
            if (!handleIsSettedPosition(1, randomCol)) {
                handleSetSquare(1, randomCol, 'O');
                return true
            }
        }

        if (selectedLevel?.codename != 'easy' && Object.values(gameData.line2).includes(0)) {
            if (!handleIsSettedPosition(2, randomCol)) {
                handleSetSquare(2, randomCol, 'O');
                return true
            }
        }

        if (selectedLevel?.codename != 'easy' && Object.values(gameData.line3).includes(0)) {
            if (!handleIsSettedPosition(3, randomCol)) {
                handleSetSquare(3, randomCol, 'O');
                return true
            }
        }

        if (!handleIsSettedPosition(randomRow, randomCol)) {
            handleSetSquare(randomRow, randomCol, 'O');
            return true
        }

        return false
    }

    useEffect(() => {
        if (!selectedLevel || !playerTurn || gameStatus != 'playing') return;

        if (playerTurn == 'O') {
            setPlayerTurn('X');

            let stopLoop = false
            while (!stopLoop) {
                stopLoop = handlePlayAuto()
            }
        }

    }, [selectedLevel, playerTurn])

    useEffect(() => {
        if (!selectedLevel || gameStatus != 'playing') return;
        
        setSubtitle('Forme uma linha reta de suas peças antes de seu oponente')

        if (selectedLevel.difficulty > 0) {
            setPlayerTurn('O')
        }
    }, [selectedLevel])

    useEffect(() => {
        if (!selectedLevel || gameStatus != 'playing') return;

        const { line1, line2, line3 } = gameData

        if (
            (line1[1] === 1 && line2[1] === 1 && line3[1] === 1) ||
            (line1[2] === 1 && line2[2] === 1 && line3[2] === 1) ||
            (line1[3] === 1 && line2[3] === 1 && line3[3] === 1) ||
            (line1[1] === 1 && line1[2] === 1 && line1[3] === 1) ||
            (line2[1] === 1 && line2[2] === 1 && line2[3] === 1) ||
            (line3[1] === 1 && line3[2] === 1 && line3[3] === 1) ||
            (line1[1] === 1 && line2[2] === 1 && line3[3] === 1) ||
            (line1[3] === 1 && line2[2] === 1 && line3[1] === 1)
        ) {
            setTimeout(() => {
                handleWinner()
            }, 600)

            return;
        }

        if (
            (line1[1] === 0 && line2[1] === 0 && line3[1] === 0) ||
            (line1[2] === 0 && line2[2] === 0 && line3[2] === 0) ||
            (line1[3] === 0 && line2[3] === 0 && line3[3] === 0) ||
            (line1[1] === 0 && line1[2] === 0 && line1[3] === 0) ||
            (line2[1] === 0 && line2[2] === 0 && line2[3] === 0) ||
            (line3[1] === 0 && line3[2] === 0 && line3[3] === 0) ||
            (line1[1] === 0 && line2[2] === 0 && line3[3] === 0) ||
            (line1[3] === 0 && line2[2] === 0 && line3[1] === 0)
        ) {
            setTimeout(() => {
                handleGameOver()
            }, 600)

            return;
        }

        if (!Object.values(line1).includes(-1) && !Object.values(line2).includes(-1) && !Object.values(line3).includes(-1)) {
            setTimeout(() => {
                handleDraw()
            }, 600)
        }
    }, [gameData])

    return (
        <div id={styles.app}>
            {!selectedLevel && gameStatus == 'playing' &&
                <div className={styles.levelsMenuContainer}>
                    <ListBox
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.value)}
                        options={levels}
                        optionLabel="name"
                    />
                </div>
            }

            {selectedLevel && gameStatus == 'playing' &&
                <div className={styles.gameContainer}>
                    <SquareItem
                        row={1}
                        collumn={1}
                        attributes={{
                            style: { borderLeft: 'none' },
                            onClick: () => handleSetSquare(1, 1, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={1}
                        collumn={2}
                        attributes={{
                            onClick: () => handleSetSquare(1, 2, 'X')
                        }} gameData={gameData}
                    />

                    <SquareItem
                        row={1}
                        collumn={3}
                        attributes={{
                            onClick: () => handleSetSquare(1, 3, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={2}
                        collumn={1}
                        attributes={{
                            style: { borderLeft: 'none' },
                            onClick: () => handleSetSquare(2, 1, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={2}
                        collumn={2}
                        attributes={{
                            onClick: () => handleSetSquare(2, 2, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={2}
                        collumn={3}
                        attributes={{
                            onClick: () => handleSetSquare(2, 3, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={3}
                        collumn={1}
                        attributes={{
                            style: { borderLeft: 'none', borderBottom: 'none' },
                            onClick: () => handleSetSquare(3, 1, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={3}
                        collumn={2}
                        attributes={{
                            style: { borderBottom: 'none' },
                            onClick: () => handleSetSquare(3, 2, 'X')
                        }}
                        gameData={gameData}
                    />

                    <SquareItem
                        row={3}
                        collumn={3}
                        attributes={{
                            style: { borderBottom: 'none' },
                            onClick: () => handleSetSquare(3, 3, 'X')
                        }}
                        gameData={gameData}
                    />
                </div>
            }

            {gameStatus == 'game_over' ?
                <div className={styles.gameOverContainer}>
                    <div>
                        <Image alt='Game over' src={GameOver} width={360} height={360} style={{ borderRadius: '50%' }} />
                    </div>
                    <div className={styles.gameOverContainerFooter}>
                        <Button label='Jogar novamente' onClick={handlePlayAgain} />
                    </div>
                </div>
                : gameStatus == 'win' ?
                    <div className={styles.winContainer}>
                        <div>
                            <Image alt='Win' src={Win} width={470} height={330} />
                        </div>
                        <div className={styles.winContainerFooter}>
                            <Button label='Jogar novamente' onClick={handlePlayAgain} />
                        </div>
                    </div>
                    : ''}
        </div>
    )
}