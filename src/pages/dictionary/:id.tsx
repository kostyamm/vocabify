import { useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { ContentHeader } from '../../components/UI/ContentHeader';
import { WordForm } from '../../components/Forms/WordForm';
import { LearnButton } from '../../components/UI/Buttons';
import { Tabs } from 'antd';
import { WordList } from '../../components/Lists/WordList.tsx';

const mockDictionary = {
    id: 1,
    title: 'English',
};

const mockWords = [
    {
        id: 1,
        word: 'Привет',
        translation: 'Hello',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false
    },
    {
        id: 2,
        word: 'Пагинация',
        translation: 'Pagination',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false
    },
    {
        id: 3,
        word: 'Ноутбук',
        translation: 'Laptop',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false
    },
    {
        id: 4,
        word: 'Интернет',
        translation: 'Internet',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false
    },
    {
        id: 5,
        word: 'Окно',
        translation: 'Window',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false
    },
    {
        id: 6,
        word: 'Машина',
        translation: 'Car',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false
    },
];

export const DictionaryId = () => {
    const { id: dictionaryId } = useParams();

    const [activeTab, setActiveTab] = useState('study')

    return (
        <Fragment>
            <ContentHeader
                title={`${mockDictionary.title}`}
                action={<LearnButton size="large" type="primary" itemId={dictionaryId!} />}
            />
            <WordForm />

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                animated
                items={[
                    {
                        label: 'On the study',
                        key: 'study',
                        children: <WordList words={mockWords} />,
                    },
                    {
                        label: 'Studied',
                        key: 'studied',
                        children: <WordList words={[...mockWords].splice(0, 2)} />,
                    },
                ]}
            />
        </Fragment>
    );
};
