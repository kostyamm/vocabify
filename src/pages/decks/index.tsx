import { Fragment } from 'react';
import { AddDeckModal } from '../../components/Modals';
import { DeckList } from '../../components/Lists';
import { useDecksObserver } from '../../api/hooks';
import { Container } from '../../components/Container';

export const Decks = () => {
    const { data } = useDecksObserver();

    return (
        <Fragment>
            <Container.Header
                title="Decks"
                action={<AddDeckModal />}
            />

            <Container.Content>
                <DeckList decksData={data} />
            </Container.Content>
        </Fragment>
    );
};

