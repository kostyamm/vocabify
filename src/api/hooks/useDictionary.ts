import { QueryObserver, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDictionary, Dictionary, getDictionary } from '../dictionary.ts';
import { useEffect, useState } from 'react';

const KEY = 'dictionary';

export const useGetDictionary = () => {
    return useQuery({
        queryKey: [KEY],
        queryFn: getDictionary,
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
        queryClient.setQueryData([KEY],
            (prevDictionary: Array<Dictionary> | undefined) => {
                if (prevDictionary) {

                    prevDictionary.map(dictionary => {
                        if (dictionary.id === newDictionary.id) {
                            dictionary.title = newDictionary.title;
                        }
                        return dictionary;
                    });
                }
                return prevDictionary;
            },
        );
    };

    return useMutation({
        mutationKey: [KEY],
        mutationFn: createDictionary,
        onSuccess,
    });
};

export const useGetUsersObserver = () => {
    const get_users = useGetDictionary()

    const queryClient = useQueryClient()

    const [users, setUsers] = useState<Array<Dictionary>>(() => {
        // get data from cache
        const data = queryClient.getQueryData<Array<Dictionary>>([KEY])
        return data ?? []
    })

    useEffect(() => {
        const observer = new QueryObserver<Array<Dictionary>>(queryClient, { queryKey: [KEY] })

        const unsubscribe = observer.subscribe(result => {
            if (result.data) setUsers(result.data)
        })

        return () => { unsubscribe() }
    }, [])

    return {
        ...get_users,
        data: users,
    }
}