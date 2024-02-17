import { useDataObserver } from './useDataObserver.ts';
import { Card, createCard, deleteCard, getCards, updateCard } from '../cards.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const KEY = 'cards';

export const useCardsObserver = (deckId: string) => {
    return useDataObserver<Card>([KEY, deckId.toString()], () => getCards(deckId))
}

export const useCreateCard = (deckId: string) => {
    const queryClient = useQueryClient();

    const onSuccess = (newCard: Card) => {
        queryClient.setQueryData([KEY, deckId],
            (prevCards: Array<Card> | undefined) => {
                if (prevCards) {
                    return [newCard, ...prevCards]
                }

                return [newCard]
            },
        );
    };

    return useMutation({
        mutationKey: [KEY, deckId],
        mutationFn: createCard,
        onSuccess,
    });
};

export const useUpdateCard = (deckId: string) => {
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

        queryClient.setQueryData([KEY, deckId], updater);
    };

    return useMutation({
        mutationKey: [KEY, deckId],
        mutationFn: updateCard,
        onSuccess,
    });
};


export const useDeleteCards = (deckId: string) => {
    const queryClient = useQueryClient();

    const onSuccess = (cardId: Card['id']) => {
        const updater = (cards: Array<Card> | undefined) => {
            return cards?.filter(({ id }) => id !== +cardId)
        }

        queryClient.setQueryData([KEY, deckId], updater);
    };

    return useMutation({
        mutationKey: [KEY, deckId],
        mutationFn: deleteCard,
        onSuccess,
    });
};
