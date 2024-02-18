import { Fragment } from 'react';
import { DeckList } from '../../components/Lists';
import { useGetDecksObserver } from '../../api/hooks';
import { Container } from '../../components/Container';
import { CreateDeckAction } from '../../components/Actions';

export const Decks = () => {
    const { data } = useGetDecksObserver();

    return (
        <Fragment>
            <Container.Header title="Decks" actions={[<CreateDeckAction />]} />

            <Container.Content>
                <DeckList decksData={data} />
            </Container.Content>
        </Fragment>
    );
};
