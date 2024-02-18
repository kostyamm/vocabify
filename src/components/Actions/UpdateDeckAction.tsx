import { Deck } from '../../api';
import { useBoolean } from '../../hooks/useBoolean.ts';
import { useDeleteDeck, useUpdateDeck } from '../../api/hooks';
import { useNavigate } from 'react-router-dom';
import { DeckFromSchema, DeckModal } from '../Modals';
import { DeleteIcon, EditIcon, MoreHorizontalIcon } from '../Icons';
import { Fragment } from 'react';
import { Button, Dropdown } from 'antd';

export const UpdateDeckAction = ({ deck }: { deck: Deck }) => {
    const { value: open, setTrue: showModal, setFalse: hideModal } = useBoolean();
    const updateDeck = useUpdateDeck(deck.id);
    const deleteDeck = useDeleteDeck(deck.id);
    const navigate = useNavigate();

    const onUpdateDeck = async (data: DeckFromSchema) => {
        await updateDeck.mutateAsync({ ...deck, ...data });
    };

    const onDeleteDeck = async () => {
        await deleteDeck.mutateAsync(deck.id);
        navigate('/decks');
    };

    const dropdownItems = [
        {
            key: 'edit-deck',
            label: 'Edit Deck',
            icon: <EditIcon />,
            onClick: showModal,
        },
        {
            key: 'delete-deck',
            label: 'Delete Deck',
            icon: <DeleteIcon />,
            danger: true,
            onClick: onDeleteDeck,
        },
    ];

    return (
        <Fragment>
            <DeckModal
                title="Update Deck"
                open={open}
                hideModal={hideModal}
                onConfirm={onUpdateDeck}
                initialValues={deck}
            />
            <Dropdown
                menu={{ items: dropdownItems }}
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
                trigger={['click']}
                overlayStyle={{ minWidth: 120 }}
                autoAdjustOverflow
            >
                <Button icon={<MoreHorizontalIcon />} />
            </Dropdown>
        </Fragment>
    );
};