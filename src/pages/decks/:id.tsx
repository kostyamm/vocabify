import { useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { WordForm } from '../../components/Forms/WordForm';
import { StudyButton } from '../../components/Buttons';
import { Tabs } from 'antd';
import { CardList } from '../../components/Lists/CardList.tsx';
import { useGetDeckById } from '../../api/hooks';
import { Container } from '../../components/Container';

const mockCards = [
    {
        id: 1,
        word: 'Привет',
        translation: 'Hello',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false,
    },
    {
        id: 2,
        word: 'Пагинация',
        translation: 'Pagination',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false,
    },
    {
        id: 3,
        word: 'Ноутбук',
        translation: 'Laptop',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false,
    },
    {
        id: 4,
        word: 'Интернет',
        translation: 'Internet',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: false,
    },
    {
        id: 5,
        word: 'Окно',
        translation: 'Window',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: true,
    },
    {
        id: 6,
        word: 'Машина',
        translation: 'Car',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
        studied: true,
    },
];

export const DeckId = () => {
    const { id: deckId } = useParams();
    const { data, isLoading } = useGetDeckById(deckId!);

    const [activeTab, setActiveTab] = useState('study');

    if (isLoading) return <div>Loading...</div>;

    return (
        <Fragment>
            <Container.Header
                title={`${data.title}`}
                action={<StudyButton type="primary" itemId={deckId!} />}
            />

            <Container.Content>
                <WordForm />

                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    animated
                    items={[
                        {
                            label: 'On the study',
                            key: 'study',
                            children: <CardList cards={mockCards.filter(({ studied }) => !studied)} />,
                        },
                        {
                            label: 'Studied',
                            key: 'studied',
                            children: <CardList cards={mockCards.filter(({ studied }) => studied)} />,
                        },
                    ]}
                />
            </Container.Content>
        </Fragment>
    );
};
