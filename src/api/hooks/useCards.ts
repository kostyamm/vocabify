import { useDataObserver } from './useDataObserver.ts';
import { Card, createCard, deleteCard, getCards, updateCard } from '../cards.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const KEY = 'cards';

export const useCreateCard = (deckId: number) => {
    const queryClient = useQueryClient();

    const onSuccess = (newCard: Card) => {
        queryClient.setQueryData([KEY, deckId.toString()],
            (prevCards: Array<Card> | undefined) => {
                if (prevCards) {
                    return [newCard, ...prevCards]
                }

                return [newCard]
            },
        );
    };

    return useMutation({
        mutationKey: [KEY, deckId.toString()],
        mutationFn: createCard,
        onSuccess,
    });
};

export const useUpdateCard = (deckId: number) => {
    const queryClient = useQueryClient();

    const onSuccess = (updatedCard: Card) => {
        const updater = (prevCards: Array<Card> | undefined) => {
            return prevCards?.map(card => {
                if (card.id === updatedCard.id) {
                    return updatedCard
                }

                return card;
            });
        }

        queryClient.setQueryData([KEY, deckId.toString()], updater);
    };

    return useMutation({
        mutationKey: [KEY, deckId.toString()],
        mutationFn: updateCard,
        onSuccess,
    });
};

export const useDeleteCards = (deckId: number) => {
    const queryClient = useQueryClient();

    const onSuccess = (cardId: Card['id']) => {
        const updater = (cards: Array<Card> | undefined) => {
            return cards?.filter(({ id }) => id !== +cardId)
        }

        queryClient.setQueryData([KEY, deckId.toString()], updater);
    };

    return useMutation({
        mutationKey: [KEY, deckId.toString()],
        mutationFn: deleteCard,
        onSuccess,
    });
};

export const useGetCardsObserver = (deckId: number) => {
    return useDataObserver<Array<Card>>([KEY, deckId.toString()], () => getCards(deckId))
}