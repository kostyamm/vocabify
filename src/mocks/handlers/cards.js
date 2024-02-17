import { delay, http, HttpResponse } from 'msw'

const mockCardsData = [
    {
        id: 1,
        deck_id: 1,
        frontSide: 'Привет',
        backSide: 'Hello',
        studied: false,
    },
    {
        id: 2,
        deck_id: 1,
        frontSide: 'Пагинация',
        backSide: 'Pagination',
        studied: false,
    },
    {
        id: 3,
        deck_id: 1,
        frontSide: 'Ноутбук',
        backSide: 'Laptop',
        studied: false,
    },
    {
        id: 4,
        deck_id: 1,
        frontSide: 'Интернет',
        backSide: 'Internet',
        studied: false,
    },
    {
        id: 5,
        deck_id: 1,
        frontSide: 'Окно',
        backSide: 'Window',
        studied: true,
    },
    {
        id: 6,
        deck_id: 1,
        frontSide: 'Машина',
        backSide: 'Car',
        studied: true,
    },
];

const cardsData = new Map()
mockCardsData.forEach((card) => {
    cardsData.set(card.id, card)
})

export const cards = [
    http.get('/cards', ({ request }) => {
        const url = new URL(request.url)
        const deckId = url.searchParams.get('deck_id')

        const deckCards = [...cardsData.entries()]
            .filter(({ 1: value }) => value.deck_id === +deckId)
            .map(([_, value]) => value);

        return HttpResponse.json(deckCards)
    }),
    http.post('/cards', async ({ request }) => {
        const newCard = await request.json()
        newCard.id = Date.now()

        cardsData.set(newCard.id, newCard)

        await delay(1000)

        return HttpResponse.json(newCard, { status: 201 })
    }),
    http.put('/cards/:id', async ({ request, params }) => {
        const updatedCard = await request.json()

        cardsData.set(params.id, updatedCard)

        return HttpResponse.json(updatedCard, { status: 201 })
    }),
    http.get('/cards/:id', ({ params }) => {
        const cards = cardsData.get(+params.id)

        return HttpResponse.json(cards, { status: 201 })
    }),
    http.delete('/cards/:id', async ({ params }) => {
        cardsData.delete(params.id)

        return HttpResponse.json(params.id, { status: 201 })
    }),
]