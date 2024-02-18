import { Checkbox, Flex, List } from 'antd';
import { useMemo, useState } from 'react';
import { CardListProps } from './CardList.types.tsx';
import { CardListHoveredItem } from './CardListHoveredItem.tsx';
import { CardListFilters } from './CardListFilters.tsx';

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
                    renderItem={(item) => <CardListHoveredItem item={item} />}
                />
            </Checkbox.Group>
        </Flex>
    );
};

const checkboxStyles = {
    width: '100%',
    display: 'block',
};