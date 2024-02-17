import { Fragment } from 'react';
import { DeckFromSchema, DeckModal } from '../../components/Modals';
import { DeckList } from '../../components/Lists';
import { useCreateDeck, useDecksObserver } from '../../api/hooks';
import { Container } from '../../components/Container';
import { Button } from 'antd';
import { PlusIcon } from '../../components/Icons';
import { useBoolean } from '../../hooks/useBoolean.ts';

export const Decks = () => {
    const { data } = useDecksObserver();

    return (
        <Fragment>
            <Container.Header title="Decks" actions={[<CreateDeckAction />]} />

            <Container.Content>
                <DeckList decksData={data} />
            </Container.Content>
        </Fragment>
    );
};

const CreateDeckAction = () => {
    const { value: open, setTrue: showModal, setFalse: hideModal } = useBoolean();

    const createDeck = useCreateDeck();

    const onConfirm = async ({ title }: DeckFromSchema) => {
        await createDeck.mutateAsync({ title });
    };

    return (
        <Fragment>
            <Button loading={createDeck.isPending} onClick={showModal} type="primary" icon={<PlusIcon />}>
                Create Deck
            </Button>
            <DeckModal
                title="Create Deck"
                open={open}
                hideModal={hideModal}
                onConfirm={onConfirm}
            />
        </Fragment>
    );
};

