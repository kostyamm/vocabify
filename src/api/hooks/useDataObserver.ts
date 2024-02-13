import { QueryFunction, QueryObserver, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useDataObserver = <T>(queryKey: string, queryFn: QueryFunction) => {
    const queryResult = useQuery({
        queryKey: [queryKey],
        queryFn,
    });

    const queryClient = useQueryClient()

    const [data, setUsers] = useState<Array<T>>(() => {
        // get data from cache
        const data = queryClient.getQueryData<Array<T>>([queryKey])
        return data ?? []
    })

    useEffect(() => {
        const observer = new QueryObserver<Array<T>>(queryClient, { queryKey: [queryKey] })

        const unsubscribe = observer.subscribe(({ data }) => {
            if (data) setUsers(data)
        })

        return () => { unsubscribe() }
    }, [])

    return {
        ...queryResult,
        data,
    }
}