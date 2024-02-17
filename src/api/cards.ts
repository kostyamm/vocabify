import { axiosApiInstance } from './ApiConfig.ts';

export type Card = {
    id: number,
    deck_id: number,
    frontSide: string,
    backSide: string,
    studied?: boolean
}

export const getCards = async (deckId: string | number) => {
    const config = {
        params: {
            deck_id: deckId,
        },
    };

    try {
        const { data } = await axiosApiInstance.get('/cards', config);
        return data;
    } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
    }
};

export const createCard = async (data: Omit<Card, 'id'>) => {
    try {
        const { data: responseData } = await axiosApiInstance.post('/cards', data);
        return responseData;
    } catch (e) {
        console.error(e);
    }
};

export const deleteCard = async (id: number | string) => {
    try {
        const { data } = await axiosApiInstance.delete(`/cards/${id}`);
        return data;
    } catch (e) {
        console.error(e);
    }
};
