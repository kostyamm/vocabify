import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardList } from '../../components/Lists/CardList.tsx';
import { useGetDeckById } from '../../api/hooks';
import { Container } from '../../components/Container';
import { CardFromSchema, CardModal } from '../../components/Modals';
import { Button } from 'antd';
import { GraduationIcon } from '../../components/Icons';
import { useCardsObserver, useCreateCard } from '../../api/hooks/useCards.ts';

export const DeckId = () => {
    const { id: deckId } = useParams();
    const { data, isLoading } = useGetDeckById(deckId!);
    const { data: cardsData, isLoading: isLoadingCards } = useCardsObserver(deckId!)
    const createCard = useCreateCard(deckId!)

    if (isLoading) return <div>Loading...</div>;

    const onCreateCard = async (form: CardFromSchema) => {
        await createCard.mutateAsync({ ...form, deck_id: Number(deckId!) })
    }

    return (
        <Fragment>
            <Container.Header
                title={`${data.title}`}
                actions={[
                    <StudyButton itemId={deckId!} />,
                    <CardModal title="Create Card" onConfirm={onCreateCard} confirmLoading={createCard.isPending}/>
                ]}
            />

            <Container.Content>
                <CardList cards={cardsData} loading={isLoadingCards} />
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