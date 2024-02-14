import { axiosApiInstance } from './ApiConfig.ts';

export type Dictionary = {
    id: number,
    title: string
    originalLanguage?: string,
    targetLanguage?: string,
}

export const getDictionary = async () => {
    try {
        const { data } = await axiosApiInstance.get('/dictionary')
        return data
    } catch (e) {
        console.error(e)
        throw new Error(`${e}`)
    }
}

export const getDictionaryById = async (id: string | number) => {
    try {
        const { data } = await axiosApiInstance.get(`/dictionary/${id}`)
        return data
    } catch (e) {
        console.error(e)
        throw new Error(`${e}`)
    }
}

export const createDictionary = async (data: Omit<Dictionary, 'id'>) => {
    try {
        const { data: responseData } = await axiosApiInstance.post('/dictionary', data)
        return responseData
    } catch (e) {
        console.error(e)
    }
}

export const updateDictionary = async (data: Dictionary) => {
    try {
        const { data: responseData } = await axiosApiInstance.put('/dictionary', data)
        return responseData
    } catch (e) {
        console.error(e)
    }
}

export const deleteDictionary = async (id: number | string) => {
    try {
        const { data } = await axiosApiInstance.delete(`/dictionary/${id}`)
        return data
    } catch (e) {
        console.error(e)
    }
}