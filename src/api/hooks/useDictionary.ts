import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createDictionary,
    deleteDictionary,
    getDictionary,
    updateDictionary,
    Dictionary,
    getDictionaryById,
} from '../dictionary.ts';
import { useDataObserver } from './useDataObserver.ts';

const KEY = 'dictionary';

export const useGetDictionaryById = (id: string | number) => {
    return useQuery({
        queryKey: [KEY, id],
        queryFn: () => getDictionaryById(id),
    });
};

export const useCreateDictionary = () => {
    const queryClient = useQueryClient();

    const onSuccess = (newDictionary: Dictionary) => {
        queryClient.setQueryData([KEY],
            (prevDictionary: Array<Dictionary> | undefined) => {
                if (prevDictionary) {
                    return [newDictionary, ...prevDictionary]
                }

                return [newDictionary]
            },
        );
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: createDictionary,
        onSuccess,
    });
};

export const useUpdateDictionary = () => {
    const queryClient = useQueryClient();

    const onSuccess = (newDictionary: Dictionary) => {
        const updater = (prevDictionary: Array<Dictionary> | undefined) => {
            return prevDictionary?.map(dictionary => {
                if (dictionary.id === newDictionary.id) {
                    dictionary.title = newDictionary.title;
                }

                return dictionary;
            });
        }

        queryClient.setQueryData([KEY], updater);
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: updateDictionary,
        onSuccess,
    });
};

export const useDeleteDictionary = () => {
    const queryClient = useQueryClient();

    const onSuccess = (dictionaryId: Dictionary['id']) => {
        const updater = (dictionary: Array<Dictionary> | undefined) => {
            return dictionary?.filter(({ id }) => id !== +dictionaryId)
        }

        queryClient.setQueryData([KEY], updater);
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: deleteDictionary,
        onSuccess,
    });
};

export const useDictionaryObserver = () => {
    return useDataObserver<Dictionary>(KEY, getDictionary)
}
