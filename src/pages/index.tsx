import { RootState } from '@/redux/store';
import styles from '@/styles/Home.module.scss'
import { GamesAvailable } from '@/types/Games'
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useSelector } from 'react-redux'


export default function Home() {
    const selector = useSelector((state: RootState) => state)

    const router = useRouter()

    const Footer = (game: GamesAvailable) =>
    (
        <div className={styles.cardFooter}>
            <Button
                label={game == 'Memory' ? selector.memoryGame.selectedLevel ? 'Continuar a partida' : 'Jogar' : 'Jogar'}
                onClick={() => router.push(`/games/${game}`)}
            />
        </div>
    );

    return (
        <main id={styles.app}>
            <h2 className={styles.appTitle}>
                Jogos Disponíveis 😀:
            </h2>

            <div className={styles.gameList}>
                <Card title="Jogo da Memória" subTitle="Habilidades cognitivas" footer={Footer(GamesAvailable.MEMORY)}>
                    <p style={{ textAlign: 'justify' }}>
                        O jogo da memória além de ser divertido, promove o desenvolvimento cognitivo, melhora a concentração e estimula a memória, tornando-se uma maneira educativa e prazerosa de aprender e reforçar habilidades de observação.
                    </p>
                </Card>
                <Card title="Jogo da Velha" subTitle="Raciocínio Lógico" footer={Footer(GamesAvailable.TTTOE)}>
                    <p style={{ textAlign: 'justify' }}>
                        O jogo da velha é um jogo de estratégia que oferece vantagens, como estimular o raciocínio lógico, desenvolver habilidades de planejamento e tomada de decisão, além de ser uma atividade educativa e divertida.
                    </p>
                </Card>
                <Card title="Caça-Mosca" subTitle="Concentração" footer={Footer(GamesAvailable.FLY_HUNT)}>
                    <p style={{ textAlign: 'justify' }}>
                        O jogo "Caça-mosca" é uma atividade divertida e desafiadora para todos. Ele ajuda a melhorar a coordenação motora, a concentração e pode ser uma maneira lúdica de desenvolver habilidades essenciais.
                    </p>
                </Card>
            </div>
        </main>
    )
}
