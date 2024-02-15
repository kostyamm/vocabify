import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useGetDeckById = (id: string | number) => {
    return useQuery({
        queryKey: [KEY, id],
        queryFn: () => getDeckById(id),
    });
};

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

export const useUpdateDeck = () => {
    const queryClient = useQueryClient();

    const onSuccess = (newDeck: Deck) => {
        const updater = (prevDecks: Array<Deck> | undefined) => {
            return prevDecks?.map(deck => {
                if (deck.id === newDeck.id) {
                    deck.title = newDeck.title;
                }

                return deck;
            });
        }

        queryClient.setQueryData([KEY], updater);
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: updateDeck,
        onSuccess,
    });
};

export const useDeleteDeck = () => {
    const queryClient = useQueryClient();

    const onSuccess = (deckId: Deck['id']) => {
        const updater = (decks: Array<Deck> | undefined) => {
            return decks?.filter(({ id }) => id !== +deckId)
        }

        queryClient.setQueryData([KEY], updater);
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: deleteDeck,
        onSuccess,
    });
};

export const useDecksObserver = () => {
    return useDataObserver<Deck>(KEY, getDecks)
}
