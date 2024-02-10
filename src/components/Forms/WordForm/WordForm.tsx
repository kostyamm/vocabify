import { Input, Space } from 'antd';
import { useState } from 'react';
import { WordDropdown } from './WordDropdown.tsx';
import { LanguageDropdown } from './LanguageDropdown.tsx';

export const WordForm = () => {
    const [word, setWord] = useState<string>();

    return (
        <Space.Compact style={{ marginBottom: 24 }}>
            <LanguageDropdown />
            <Input value={word} onChange={({ target }) => setWord(target.value)} size="large" placeholder="Word" />
            <WordDropdown word={word} />
        </Space.Compact>
    );
};
