import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardList } from '../../components/Lists/CardList.tsx';
import { useGetDeckById } from '../../api/hooks';
import { Container } from '../../components/Container';
import { CardFromSchema, CardModal } from '../../components/Modals';
import { Button } from 'antd';
import { GraduationIcon, PlusIcon } from '../../components/Icons';
import { useCardsObserver, useCreateCard } from '../../api/hooks/useCards.ts';
import { useBoolean } from '../../hooks/useBoolean.ts';

export const DeckId = () => {
    const { value: open, setTrue: showModal, setFalse: hideModal } = useBoolean();
    const { id: deckId } = useParams();
    const { data, isLoading } = useGetDeckById(deckId!);
    const { data: cardsData, isLoading: isLoadingCards } = useCardsObserver(deckId!);
    const createCard = useCreateCard(deckId!);

    if (isLoading) return <div>Loading...</div>;

    const onCreateCard = async (form: CardFromSchema) => {
        await createCard.mutateAsync({ ...form, deck_id: Number(deckId!) });
    };

    return (
        <Fragment>
            <CardModal
                title="Create Card"
                open={open}
                hideModal={hideModal}
                onConfirm={onCreateCard}
            />

            <Container.Header
                title={data.title}
                actions={[
                    <StudyButton itemId={deckId!} />,
                    <Button loading={createCard.isPending} onClick={showModal} type="primary" icon={<PlusIcon />}>
                        Create Card
                    </Button>,
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
            onClick={() => {
                navigate(`/study/${itemId}`);
            }}
        >
            Study
        </Button>
    );
};