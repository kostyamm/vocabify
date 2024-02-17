import { axiosApiInstance } from './ApiConfig.ts';

export type Deck = {
    id: number,
    title: string
}

export const getDecks = async () => {
    try {
        const { data } = await axiosApiInstance.get('/decks')
        return data
    } catch (e) {
        console.error(e)
        throw new Error(`${e}`)
    }
}

export const getDeckById = async (id: string | number) => {
    try {
        const { data } = await axiosApiInstance.get(`/decks/${id}`)
        return data
    } catch (e) {
        console.error(e)
        throw new Error(`${e}`)
    }
}

export const createDeck = async (data: Omit<Deck, 'id'>) => {
    try {
        const { data: responseData } = await axiosApiInstance.post('/decks', data)
        return responseData
    } catch (e) {
        console.error(e)
    }
}

export const updateDeck = async (data: Deck) => {
    try {
        const { data: responseData } = await axiosApiInstance.put('/decks', data)
        return responseData
    } catch (e) {
        console.error(e)
    }
}

export const deleteDeck = async (id: number | string) => {
    try {
        const { data } = await axiosApiInstance.delete(`/decks/${id}`)
        return data
    } catch (e) {
        console.error(e)
    }
}