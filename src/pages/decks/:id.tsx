import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { CardList } from '../../components/Lists';
import { useGetDeckObserver } from '../../api/hooks';
import { Container } from '../../components/Container';
import { useGetCardsObserver } from '../../api/hooks/useCards.ts';
import { CreateCardAction, StudyButtonAction, UpdateDeckAction } from '../../components/Actions';

export const DeckId = () => {
    const { id: deckId } = useParams();
    const deck = useGetDeckObserver(Number(deckId));
    const cards = useGetCardsObserver(Number(deckId));

    return (
        <Fragment>
            <Container.Header
                loading={deck.isLoading}
                title={deck.data?.title}
                actions={[
                    <StudyButtonAction deckId={Number(deckId)} />,
                    <CreateCardAction deckId={Number(deckId)} />,
                    <UpdateDeckAction deck={deck.data!} />,
                ]}
            />

            <Container.Content>
                <CardList cards={cards.data} loading={cards.isLoading} />
            </Container.Content>
        </Fragment>
    );
};
