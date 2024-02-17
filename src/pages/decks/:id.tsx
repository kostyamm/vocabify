import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardList } from '../../components/Lists/CardList.tsx';
import { useGetDeckById } from '../../api/hooks';
import { Container } from '../../components/Container';
import { CardFromSchema, CardModal } from '../../components/Modals';
import { Button } from 'antd';
import { GraduationIcon } from '../../components/Icons';

const mockCards = [
    {
        id: 1,
        frontSide: 'Привет',
        backSide: 'Hello',
        studied: false,
    },
    {
        id: 2,
        frontSide: 'Пагинация',
        backSide: 'Pagination',
        studied: false,
    },
    {
        id: 3,
        frontSide: 'Ноутбук',
        backSide: 'Laptop',
        studied: false,
    },
    {
        id: 4,
        frontSide: 'Интернет',
        backSide: 'Internet',
        studied: false,
    },
    {
        id: 5,
        frontSide: 'Окно',
        backSide: 'Window',
        studied: true,
    },
    {
        id: 6,
        frontSide: 'Машина',
        backSide: 'Car',
        studied: true,
    },
];

export const DeckId = () => {
    const { id: deckId } = useParams();
    const { data, isLoading } = useGetDeckById(deckId!);

    if (isLoading) return <div>Loading...</div>;

    const onCreateCard = (form: CardFromSchema) => {
        console.log(form);
    }

    return (
        <Fragment>
            <Container.Header
                title={`${data.title}`}
                actions={[
                    <StudyButton itemId={deckId!} />,
                    <CardModal title="Create Card" onConfirm={onCreateCard} confirmLoading={false}/>
                ]}
            />

            <Container.Content>
                <CardList cards={mockCards} />
            </Container.Content>
        </Fragment>
    );
};

const StudyButton = ({ itemId }: { itemId: string | number }) => {
    const navigate = useNavigate();

    return (
        <Button
            type="primary"
            icon={<GraduationIcon key="study" />}
            onClick={() => {navigate(`/study/${itemId}`)}}
        >
            Study
        </Button>
    );
};