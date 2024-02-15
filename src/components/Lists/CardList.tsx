import { Checkbox, CheckboxProps, Col, Flex, List, Row } from 'antd';
import { useMemo, useState } from 'react';

type Card = {
    id: number,
    word: string,
    translation: string,
    originalLanguage: string,
    targetLanguage: string,
    studied: boolean
}

type CardListProps = {
    cards: Array<Card>
}

export const CardList = ({ cards }: CardListProps) => {
    const [checkedList, setCheckedList] = useState<Array<number>>([]);

    const wordsIds = useMemo(
        () => cards.map(({ id }) => id),
        [cards],
    );
    const indeterminate = checkedList.length > 0 && checkedList.length < wordsIds.length;
    const checkAll = wordsIds.length === checkedList.length;


    const onChange = (list: Array<number>) => {
        setCheckedList(list);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? wordsIds : []);
    };

    return (
        <Flex gap={12} vertical>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
            </Checkbox>

            <Checkbox.Group value={checkedList} onChange={onChange} style={checkboxStyles}>
                <List
                    itemLayout="horizontal"
                    dataSource={cards}
                    renderItem={(item) => (
                        <List.Item>
                            <Row gutter={16}>
                                <Col>
                                    <Checkbox value={item.id} />
                                </Col>
                                <Col>
                                    <List.Item.Meta
                                        title={item.word}
                                        description={item.translation}
                                    />
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            </Checkbox.Group>
        </Flex>
    );
};

const checkboxStyles = {
    width: '100%',
    display: 'block',
};