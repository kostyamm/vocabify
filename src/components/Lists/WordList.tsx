import { Checkbox, CheckboxProps, Col, List, Row } from 'antd';
import { Fragment, useMemo, useState } from 'react';

type Word = {
    id: number,
    word: string,
    translation: string,
    originalLanguage: string,
    targetLanguage: string,
    studied: boolean
}

type WordListProps = {
    words: Array<Word>
}

export const WordList = ({ words }: WordListProps) => {
    const [checkedList, setCheckedList] = useState<Array<number>>([]);

    const wordsIds = useMemo(
        () => words.map(({ id }) => id),
        [words],
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
        <Fragment>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
            </Checkbox>

            <Checkbox.Group value={checkedList} onChange={onChange} style={checkboxStyles}>
                <List
                    itemLayout="horizontal"
                    dataSource={words}
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
        </Fragment>
    );
};

const checkboxStyles = {
    width: '100%',
    display: 'block',
};