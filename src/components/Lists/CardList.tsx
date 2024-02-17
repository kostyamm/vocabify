import { Button, Checkbox, Col, Flex, Grid, Input, List, Row } from 'antd';
import { Fragment, useMemo, useState } from 'react';
import { DeleteIcon, EditIcon, SearchIcon } from '../Icons';
import { Card } from '../../api';
import { useDeleteCards, useUpdateCard } from '../../api/hooks/useCards.ts';
import { CardFromSchema, CardModal } from '../Modals';
import { useBoolean } from '../../hooks/useBoolean.ts';

type CardListProps = {
    cards?: Array<Card>;
    loading?: boolean
}

type CardListFiltersProps = {
    onCheckAll: () => void;
    isAllChecked: boolean;
}

export const CardList = ({ cards = [], loading }: CardListProps) => {
    const [checkedList, setCheckedList] = useState<Array<number>>([]);

    const getCardsIds = () => cards?.map(({ id }) => id);
    const cardsIds = useMemo(getCardsIds, [cards]);

    const isAllChecked = !!cardsIds.length && cardsIds.length === checkedList.length;

    const onChange = (list: Array<number>) => {
        setCheckedList(list);
    };

    const onCheckAll = () => {
        setCheckedList(isAllChecked ? [] : cardsIds);
    };

    return (
        <Flex gap={12} vertical>
            <CardListFilters onCheckAll={onCheckAll} isAllChecked={isAllChecked} />

            <Checkbox.Group value={checkedList} onChange={onChange} style={checkboxStyles}>
                <List
                    itemLayout="horizontal"
                    dataSource={cards}
                    loading={loading}
                    renderItem={(item) => <HoveredCardItem item={item} />}
                />
            </Checkbox.Group>
        </Flex>
    );
};

const HoveredCardItem = ({ item }: { item: Card }) => {
    const [showActions, setShowActions] = useState(false);
    const deleteCards = useDeleteCards(item.deck_id.toString());
    const breakpoint = Grid.useBreakpoint();
    const isMobile = !breakpoint.md;

    const onDeleteCard = async () => {
        await deleteCards.mutateAsync(item.id);
    };

    const getActions = () => {
        if (!showActions && !isMobile && !deleteCards.isPending) {
            return [];
        }

        return [
            <UpdateCardAction item={item} />,
            <Button loading={deleteCards.isPending} onClick={onDeleteCard} danger icon={<DeleteIcon />} />,
        ];
    };

    return (
        <List.Item
            actions={getActions()}
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

const CardListFilters = ({ onCheckAll, isAllChecked }: CardListFiltersProps) => {
    return (
        <Flex vertical gap={24}>
            <Input placeholder="Search" allowClear addonBefore={<SearchIcon />} />

            <div>
                <Button
                    size="small"
                    onClick={onCheckAll}
                    type={isAllChecked ? 'primary' : 'default'}
                >
                    {isAllChecked ? 'Uncheck all' : 'Check all'}
                </Button>
            </div>
        </Flex>
    );
};

const UpdateCardAction = ({ item }: { item: Card }) => {
    const { value: open, setTrue: showModal, setFalse: hideModal } = useBoolean();
    const updateCard = useUpdateCard(item.deck_id.toString());

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

const clearHyphens = (text: string) => {
    const hasHyphens = text.includes('\n')

    if (hasHyphens) {
        const [firstLine, _] = text.split('\n')
        return `${firstLine}...`
    }

    return text
}

const checkboxStyles = {
    width: '100%',
    display: 'block',
};