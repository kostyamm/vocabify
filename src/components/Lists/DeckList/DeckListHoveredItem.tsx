import { Avatar, Button, Grid, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDeleteDeck } from '../../../api/hooks';
import { Deck } from '../../../api';
import { ChevronRightIcon, DeleteIcon } from '../../Icons';
import { CSSProperties, MouseEventHandler, useState } from 'react';

export const DeckListHoveredItem = ({ item }: { item: Deck }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const deckItemActions = useDeckItemActions(item, showActions)

    return (
        <List.Item
            extra={<ChevronRightIcon />}
            actions={deckItemActions}
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

const useDeckItemActions = (item: Deck, showActions: boolean) => {
    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.md

    const deleteDeck = useDeleteDeck(item.id);

    const onDeleteDeck: MouseEventHandler = async (event) => {
        event.stopPropagation();
        await deleteDeck.mutateAsync(item.id);
    };

    if (!showActions && !isMobile) {
        return [];
    }

    return [
        <Button onClick={onDeleteDeck} danger icon={<DeleteIcon />} />,
    ];
}

const listStyle: CSSProperties = {
    cursor: 'pointer',
};