import { QueryFunction, QueryObserver, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export const useDataObserver = <T>(queryKey: Array<string>, queryFn: QueryFunction) => {
    const queryClient = useQueryClient()
    const queryResult = useQuery({
        queryKey,
        queryFn,
    });

    const [data, setUsers] = useState<Array<T>>(() => {
        // Get data from cache
        const data = queryClient.getQueryData<Array<T>>(queryKey)
        return data ?? []
    })

    const queryObserver = useMemo(() => {
        return new QueryObserver<Array<T>>(queryClient, { queryKey });
    }, [queryClient, queryKey]);

    useEffect(() => {
        queryObserver.subscribe(({ data }) => {
            if (data) setUsers(data)
        })

        return () => queryObserver.destroy()
    }, [queryObserver]);

    return {
        ...queryResult,
        data,
    }
}