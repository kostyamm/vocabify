import { Card } from '../../../api';
import { useState } from 'react';
import { useDeleteCards } from '../../../api/hooks/useCards.ts';
import { Button, Checkbox, Col, Grid, List, Row } from 'antd';
import { DeleteIcon } from '../../Icons';
import { UpdateCardAction } from '../../Actions';

export const CardListHoveredItem = ({ item }: { item: Card }) => {
    const [showActions, setShowActions] = useState(false);
    const cardItemActions = useCardItemActions(item, showActions)

    return (
        <List.Item
            actions={cardItemActions}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <Row gutter={16}>
                <Col>
                    <Checkbox value={item.id} />
                </Col>
                <Col>
                    <List.Item.Meta
                        title={clearHyphens(item.frontSide)}
                        description={clearHyphens(item.backSide)}
                    />
                </Col>
            </Row>
        </List.Item>
    );
};

const useCardItemActions = (item: Card, showActions: boolean) => {
    const deleteCards = useDeleteCards(item.deck_id);
    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.md;

    const onDeleteCard = async () => {
        await deleteCards.mutateAsync(item.id);
    };

    if (!showActions && !isMobile && !deleteCards.isPending) {
        return [];
    }

    return [
        <UpdateCardAction item={item} />,
        <Button loading={deleteCards.isPending} onClick={onDeleteCard} danger icon={<DeleteIcon />} />,
    ];
}

const clearHyphens = (text: string) => {
    const hasHyphens = text.includes('\n')

    if (hasHyphens) {
        const [firstLine, _] = text.split('\n')
        return `${firstLine}...`
    }

    return text
}