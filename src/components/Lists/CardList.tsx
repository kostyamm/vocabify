import { Button, Checkbox, Col, Flex, Input, List, Row } from 'antd';
import { useMemo, useState } from 'react';
import { SearchIcon } from '../Icons';

type Card = {
    id: number,
    frontSide: string,
    backSide: string,
    studied: boolean
}

type CardListProps = {
    cards: Array<Card>
}

type CardListFiltersProps = {
    onCheckAll: () => void;
    isAllChecked: boolean;
}

export const CardList = ({ cards }: CardListProps) => {
    const [checkedList, setCheckedList] = useState<Array<number>>([]);
    const cardsIds = useMemo(() => cards.map(({ id }) => id),
        [cards],
    );
    const isAllChecked = cardsIds.length == checkedList.length;

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
                    renderItem={renderItem}
                />
            </Checkbox.Group>
        </Flex>
    );
};

const renderItem = (item: Card) => {
    return (
        <List.Item>
            <Row gutter={16}>
                <Col>
                    <Checkbox value={item.id} />
                </Col>
                <Col>
                    <List.Item.Meta
                        title={item.frontSide}
                        description={item.backSide}
                    />
                </Col>
            </Row>
        </List.Item>
    )
}

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
    )
}

const checkboxStyles = {
    width: '100%',
    display: 'block',
};