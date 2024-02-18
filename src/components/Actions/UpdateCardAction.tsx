import { Card } from '../../api';
import { useBoolean } from '../../hooks/useBoolean.ts';
import { useUpdateCard } from '../../api/hooks/useCards.ts';
import { CardFromSchema, CardModal } from '../Modals';
import { Fragment } from 'react';
import { Button } from 'antd';
import { EditIcon } from '../Icons';

export const UpdateCardAction = ({ item }: { item: Card }) => {
    const { value: open, setTrue: showModal, setFalse: hideModal } = useBoolean();
    const updateCard = useUpdateCard(item.deck_id);

    const onUpdateCard = async (data: CardFromSchema) => {
        await updateCard.mutateAsync({ ...item, ...data });
    };

    return (
        <Fragment>
            <Button loading={updateCard.isPending} onClick={showModal} icon={<EditIcon />} />
            <CardModal
                title="Update Card"
                open={open}
                hideModal={hideModal}
                onConfirm={onUpdateCard}
                initialValues={item}
            />
        </Fragment>
    );
};