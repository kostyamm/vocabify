import { Fragment } from 'react';
import { DeckFromSchema, DeckModal } from '../../components/Modals';
import { DeckList } from '../../components/Lists';
import { useCreateDeck, useDecksObserver } from '../../api/hooks';
import { Container } from '../../components/Container';

export const Decks = () => {
    const { data } = useDecksObserver();

    const createDeck = useCreateDeck();

    const onConfirm = async ({ title }: DeckFromSchema) => {
        await createDeck.mutateAsync({ title });
    };

    return (
        <Fragment>
            <Container.Header
                title="Decks"
                actions={<DeckModal
                    title="Create Deck"
                    onConfirm={onConfirm}
                    confirmLoading={createDeck.isPending}
                />}
            />

            <Container.Content>
                <DeckList decksData={data} />
            </Container.Content>
        </Fragment>
    );
};

