import { axiosApiInstance } from './ApiConfig.ts';

export type Dictionary = {
    id: number;
    title: string;
}

export const getDictionary = async () => {
    try {
        const { data } = await axiosApiInstance.get('/dictionary')
        return data
    } catch (e) {
        console.error(e)
    }
}

export const createDictionary = async (data: Omit<Dictionary, 'id'>) => {
    try {
        const { data: responseData } = await axiosApiInstance.post('/dictionary', data)
        return responseData
    } catch (e) {
        console.error(e)
        throw new Error('asdasd')
    }
}

export const deleteDictionary = async (id: number | string) => {
    try {
        return await axiosApiInstance.delete(`/dictionary/${id}`)
    } catch (e) {
        console.error(e)
    }
}