import { useBoolean } from '../../hooks/useBoolean.ts';
import { useCreateDeck } from '../../api/hooks';
import { DeckFromSchema, DeckModal } from '../Modals';
import { Fragment } from 'react';
import { Button } from 'antd';
import { PlusIcon } from '../Icons';

export const CreateDeckAction = () => {
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

