import { Avatar, Button, Grid, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDeleteDeck, useUpdateDeck } from '../../api/hooks';
import { Deck } from '../../api';
import { ChevronRightIcon, DeleteIcon, EditIcon } from '../Icons';
import { CSSProperties, MouseEventHandler, useState } from 'react';

type DeckListProps = {
    decksData?: Array<Deck>
}

export const DeckList = ({ decksData }: DeckListProps) => {
    return (
        <List
            dataSource={decksData}
            renderItem={(item) => <HoveredDeckItem item={item} />}
        />
    );
};

const HoveredDeckItem = ({ item }: { item: Deck }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.md

    const updateDeck = useUpdateDeck();
    const deleteDeck = useDeleteDeck();

    const onUpdateDeck: MouseEventHandler = async (event) => {
        event.stopPropagation()

        const mutateData = {
            id: item.id,
            title: item.title + '[updated]',
        };

        await updateDeck.mutateAsync(mutateData);
    };

    const onDeleteDeck: MouseEventHandler = async (event) => {
        event.stopPropagation();
        await deleteDeck.mutateAsync(item.id);
    };

    const getActions = () => {
        if (!showActions && !isMobile) {
            return [];
        }

        return [
            <Button onClick={onUpdateDeck} icon={<EditIcon />} />,
            <Button onClick={onDeleteDeck} danger icon={<DeleteIcon />} />,
        ];
    };

    return (
        <List.Item
            extra={<ChevronRightIcon />}
            actions={getActions()}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            onClick={() => navigate(`/decks/${item.id}`)}
            style={listStyle}
        >
            <List.Item.Meta
                title={item.title}
                description="Cards for study: 12"
                avatar={<Avatar icon={item.title[0]} />}
            />
        </List.Item>
    );
};

const listStyle: CSSProperties = {
    cursor: 'pointer',
};