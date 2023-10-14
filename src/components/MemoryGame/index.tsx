import { setAttempts, setAttemptsMax, setAvailableCards, setCorrectCards, setFlippedCards, setGameStatus, setSelectedLevel, setShowedEndScreen } from '@/redux/reducers/memoryGame';
import { RootState } from '@/redux/store';
import { Card } from '@/types/MemoryGame';
import { Level } from '@/types/Games';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameOver from '../../../public/images/game_over.png';
import Win from '../../../public/images/win.png';
import { cards, categories } from './AvailableCards';
import styles from './MemoryGame.module.scss';

type Props = {
    setSubtitle: (text: string) => void
}

export default ({ setSubtitle }: Props) => {
    const game = useSelector((state: RootState) => state.memoryGame)

    const toast = useRef<Toast>(null);
    const dispatch = useDispatch()

    const levels: Level[] = [
        { name: 'Nível: Fácil', codename: 'easy', difficulty: 0 },
        { name: 'Nível: Médio', codename: 'average', difficulty: 1 },
        { name: 'Nível: Difícil', codename: 'hard', difficulty: 2 }
    ];

    const sortArray = (array: Card[]) => {
        for (let i = 0; i < array.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array
    }

    const flipCard = (card: Card) => {
        if (game.selectedLevel?.codename == 'easy' && game.flippedCards.length > 2) {
            dispatch(setFlippedCards([card]));
            dispatch(setAttempts(game.attempts + 1))
            return;
        }

        if (game.selectedLevel?.codename != 'easy' && game.flippedCards.length >= 2) {
            dispatch(setFlippedCards([card]));
            dispatch(setAttempts(game.attempts + 1))
            return;
        }

        if (game.flippedCards.find((item) => item.src == card.src && item.code != card.code)) {
            dispatch(setCorrectCards(game.correctCards.concat([card])));
            dispatch(setFlippedCards([]))
            return;
        }

        if (game.flippedCards.find((item) => item.src == card.src) || game.correctCards.find((item) => item.src == card.src)) {
            return
        }

        dispatch(setFlippedCards(game.flippedCards.concat([card])))
    }

    const quitGame = () => {
        dispatch(setSelectedLevel(null));
        dispatch(setAvailableCards([]));
        dispatch(setCorrectCards([]));
        dispatch(setFlippedCards([]));
        dispatch(setAttempts(0));
        dispatch(setAttemptsMax(0));
        dispatch(setGameStatus('playing'));
        dispatch(setShowedEndScreen(false));
    }

    const handlePlayAgain = () => {
        quitGame()
    }

    useEffect(() => {
        if (game.selectedLevel && game.attempts >= game.attemptsMax) {
            setSubtitle('Você perdeu 😢... Tente novamente!')
            dispatch(setGameStatus('game_over'))
            dispatch(setShowedEndScreen(true))
        }
    }, [game.attempts])

    useEffect(() => {
        if (!game.showedEndScreen && game.selectedLevel && game.correctCards.length * 2 === game.availableCards.length) {
            setSubtitle('Parabéns você ganhou 😀... Continue jogando para obter mais pontos!')
            dispatch(setGameStatus('win'));
            dispatch(setShowedEndScreen(true))

            // Sound - Received Coins
            const audio = new Audio('/audios/received_coins.mp3')
            audio.play()

            toast.current?.show({ severity: 'success', content: 'Você obteu mais 10 moedas, continue jogando para obter mais pontos! ' });
        }
    }, [game.correctCards])

    useEffect(() => {
        if (!game.selectedLevel) {
            if (game.gameStatus == 'playing') setSubtitle('Selecione um nível de dificuldade para começar a jogar')
            return;
        }
        const selectedCategory = categories[Math.floor(Math.random() * (3))]
        const selectedCards = sortArray(cards.filter((item) => item.category_code == selectedCategory.category_code))

        var limiteCards = selectedCards.slice(-6)

        if (game.selectedLevel?.codename == 'easy' && game.gameStatus == 'playing') {
            setSubtitle('Você tem 10 tentativas para encontrar o par de todas as cartas')
            dispatch(setAttemptsMax(10))
        } else if (game.selectedLevel?.codename == 'average' && game.gameStatus == 'playing') {
            limiteCards = selectedCards.slice(-8)

            setSubtitle('Você tem 15 tentativas para encontrar o par de todas as cartas');
            dispatch(setAttemptsMax(15))
        } else if (game.selectedLevel?.codename == 'hard' && game.gameStatus == 'playing') {
            limiteCards = selectedCards.slice(-12)

            setSubtitle('Você tem 20 tentativas para encontrar o par de todas as cartas');
            dispatch(setAttemptsMax(20))
        }

        if (game.availableCards.length <= 0) {
            const duplicatedCards = sortArray(limiteCards.concat(JSON.parse(JSON.stringify(limiteCards))))

            let avbCards: Card[] = []
            duplicatedCards.map((item, k) => {
                const cardItem: Card = { ...item }
                cardItem.code = k.toString()

                avbCards.push(cardItem)
            })

            dispatch(setAvailableCards(avbCards))
        }

    }, [game.selectedLevel])

    return (
        <div id={styles.app}>
            <Toast ref={toast} />

            {!game.selectedLevel && game.gameStatus == 'playing' &&
                <div className={styles.levelsMenuContainer}>
                    <ListBox
                        value={game.selectedLevel}
                        onChange={(e) => dispatch(setSelectedLevel(e.value))}
                        options={levels}
                        optionLabel="name"
                    />
                </div>
            }

            {game.selectedLevel && game.gameStatus == 'playing' &&
                <div className={styles.gameContainer}>
                    <div className={styles.gameContainerHeader}>
                        <div className={styles.gameContainerHeaderInfosContainer}>
                            <div className={styles.gameContainerHeaderInfos}>
                                <span className={styles.gameContainerHeaderInfosLabel}>Tentativas</span>
                                <span className={styles.gameContainerHeaderInfosCount}>{game.attempts}/{game.attemptsMax}</span>
                            </div>
                            <div className={styles.gameContainerHeaderProgressBar}>
                                <ProgressBar showValue={false} value={(game.attempts / game.attemptsMax) * 100} color='var(--grf-gray-100)'></ProgressBar>
                            </div>
                        </div>

                        <div >
                            <Tooltip target=".quit-game" style={{ fontSize: 14, marginLeft: 5 }} />

                            <Icon
                                style={{ cursor: 'pointer' }}
                                icon="el:off"
                                color='var(--grf-red)'
                                className="quit-game"
                                data-pr-tooltip="Encerrar a partida"
                                onClick={quitGame}
                            />
                        </div>
                    </div>

                    <div className={styles.gameContainerBody}>
                        <div
                            className={styles.gameCards}
                            style={{
                                gridTemplateColumns: game.selectedLevel.codename == 'hard' ? 'auto auto auto auto auto auto' : 'auto auto auto auto',
                                gap: game.selectedLevel.codename == 'hard' ? '20px' : '20px 60px',
                            }}
                        >

                            {game.availableCards.map((item, key) => (
                                <div
                                    key={key}
                                    onClick={() => flipCard(item)}
                                    className={styles.gameCardItem}
                                    style={{ transform: game.flippedCards.find((v) => v.code == item.code) || game.correctCards.find((v) => v.src == item.src) ? 'rotateY(180deg)' : '' }}
                                >
                                    <div className={styles.gameCardItemFront}>
                                    </div>
                                    <div className={styles.gameCardItemBack}>
                                        <Icon icon={item.src} fontSize={45} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }

            {game.gameStatus == 'game_over' ?
                <div className={styles.gameOverContainer}>
                    <div>
                        <Image alt='Game over' src={GameOver} width={360} height={360} style={{ borderRadius: '50%' }} />
                    </div>
                    <div className={styles.gameOverContainerFooter}>
                        <Button label='Jogar novamente' onClick={handlePlayAgain} />
                    </div>
                </div>
                : game.gameStatus == 'win' ?
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