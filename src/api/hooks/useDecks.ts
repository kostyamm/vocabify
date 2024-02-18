import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createDeck,
    deleteDeck,
    getDecks,
    updateDeck,
    Deck,
    getDeckById,
} from '../decks.ts';
import { useDataObserver } from './useDataObserver.ts';

const KEY = 'decks';

export const useCreateDeck = () => {
    const queryClient = useQueryClient();

    const onSuccess = (newDeck: Deck) => {
        queryClient.setQueryData([KEY],
            (prevDecks: Array<Deck> | undefined) => {
                if (prevDecks) {
                    return [newDeck, ...prevDecks]
                }

                return [newDeck]
            },
        );
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: createDeck,
        onSuccess,
    });
};

export const useUpdateDeck = (deckId: number) => {
    const queryClient = useQueryClient();

    const onSuccess = (updatedDeck: Deck) => {
        const updaterObject = () => updatedDeck

        const updaterArray = (prevDeck: Array<Deck> | undefined) => {
            return prevDeck?.map(deck => {
                if (deck.id === updatedDeck.id) {
                    return updatedDeck
                }

                return deck;
            });
        }

        queryClient.setQueryData([KEY], updaterArray);
        queryClient.setQueryData([KEY, deckId.toString()], updaterObject);
    };

    return useMutation({
        mutationKey: [KEY, deckId.toString()],
        mutationFn: updateDeck,
        onSuccess,
    });
};

export const useDeleteDeck = (deckId: number) => {
    const queryClient = useQueryClient();

    const onSuccess = (deckId: Deck['id']) => {
        const updaterObject = () => null

        const updaterArray = (decks: Array<Deck> | undefined) => {
            return decks?.filter(({ id }) => id !== +deckId)
        }

        queryClient.setQueryData([KEY], updaterArray);
        queryClient.setQueryData([KEY, deckId.toString()], updaterObject);
    };

    return useMutation({
        mutationKey: [KEY, deckId.toString()],
        mutationFn: deleteDeck,
        onSuccess,
    });
};

export const useGetDecksObserver = () => {
    return useDataObserver<Array<Deck>>([KEY], getDecks)
}

export const useGetDeckObserver = (deckId: number) => {
    return useDataObserver<Deck>([KEY, deckId.toString()], () => getDeckById(deckId))
}
