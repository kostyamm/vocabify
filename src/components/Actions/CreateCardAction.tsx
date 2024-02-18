import { useBoolean } from '../../hooks/useBoolean.ts';
import { useCreateCard } from '../../api/hooks/useCards.ts';
import { CardFromSchema, CardModal } from '../Modals';
import { Fragment } from 'react';
import { Button } from 'antd';
import { PlusIcon } from '../Icons';

export const CreateCardAction = ({ deckId }: { deckId: number }) => {
    const { value: open, setTrue: showModal, setFalse: hideModal } = useBoolean();
    const createCard = useCreateCard(Number(deckId));

    const onCreateCard = async (form: CardFromSchema) => {
        await createCard.mutateAsync({ ...form, deck_id: Number(deckId) });
    };

    return (
        <Fragment>
            <Button loading={createCard.isPending} onClick={showModal} type="primary" icon={<PlusIcon />}>
                Create Card
            </Button>
            <CardModal
                title="Create Card"
                open={open}
                hideModal={hideModal}
                onConfirm={onCreateCard}
            />
        </Fragment>
    );
};
