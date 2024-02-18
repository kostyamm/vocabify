import { QueryFunction, QueryObserver, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export const useDataObserver = <T>(queryKey: Array<string>, queryFn: QueryFunction) => {
    const queryClient = useQueryClient()
    const queryResult = useQuery({
        queryKey,
        queryFn,
    });

    const [data, setUsers] = useState<T | undefined>(() => {
        // Get data from cache
        return queryClient.getQueryData<T>(queryKey)
    })

    const queryObserver = useMemo(() => {
        return new QueryObserver<T>(queryClient, { queryKey });
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