import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Select, SelectProps, Space, Tag, Typography } from 'antd';
import { ArrowRightLeftIcon, ChevronRightIcon, LanguagesIcon } from '../../Icons';

export const LanguageDropdown = () => {
    const [wordValue, setWordValue] = useState(() => 'RU');
    const [translationValue, setTranslationValue] = useState(() => 'EN');

    const LanguageDropdownMenu = () => {
        return (
            <Card size="small" title="Language">
                <Space.Compact>
                    <LanguageSelect title="Word" value={wordValue} onChange={setWordValue} />
                    <Flex vertical gap={8} justify="flex-end">
                        <Button icon={<ArrowRightLeftIcon />} />
                    </Flex>
                    <LanguageSelect title="Translation" value={translationValue} onChange={setTranslationValue} />
                </Space.Compact>
            </Card>
        );
    };

    return (
        <Dropdown
            autoAdjustOverflow
            dropdownRender={LanguageDropdownMenu}
            placement="bottomLeft"
            trigger={['click']}
            arrow
        >
            <Button
                style={{ width: 160, display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                size="large"
                icon={<LanguagesIcon />}
            >
                <Tag bordered={false}>{wordValue}</Tag>
                <ChevronRightIcon style={{ margin: 0, opacity: 0.2 }} />
                <Tag bordered={false}>{translationValue}</Tag>
            </Button>
        </Dropdown>
    );
};

const LanguageSelect = ({ value, onChange, title }: {
    title: string,
    value: SelectProps['value'],
    onChange: (value: SelectProps['value']) => void,
}) => {
    const languageOptions: SelectProps['options'] = [
        { value: 'RU', label: 'Russian' },
        { value: 'EN', label: 'English' },
        { value: 'PL', label: 'Polish' },
        { value: 'BE', label: 'Belarusian' },
    ];

    return (
        <Flex vertical gap={8}>
            <Typography.Text strong>{title}</Typography.Text>
            <Select
                style={{ minWidth: 145 }}
                value={value}
                onChange={onChange}
                showSearch
                placeholder={title}
                options={languageOptions}
            />
        </Flex>
    );
};