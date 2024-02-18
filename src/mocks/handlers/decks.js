import { delay, http, HttpResponse } from 'msw'

const mockDecksData = [
    {
        id: 1,
        title: 'English',
    },
    {
        id: 2,
        title: 'Polish',
    },
    {
        id: 3,
        title: 'Belarusian',
    },
    {
        id: 4,
        title: 'Sport',
    },
    {
        id: 5,
        title: 'Family (eng)',
    },
    {
        id: 6,
        title: 'Home',
    },
    {
        id: 7,
        title: 'Travel',
    },
];

const decksData = new Map()
mockDecksData.forEach((deck) => {
    decksData.set(deck.id, deck)
})

export const decks = [
    http.get('/decks', () => {
        return HttpResponse.json(Array.from(decksData.values()))
    }),
    http.post('/decks', async ({ request }) => {
        const newDeck = await request.json()
        newDeck.id = Date.now()

        decksData.set(newDeck.id, newDeck)

        await delay(1000)

        return HttpResponse.json(newDeck, { status: 201 })
    }),
    http.put('/decks/:id', async ({ request, params }) => {
        const updatedDeck = await request.json()

        decksData.set(params.id, updatedDeck)

        return HttpResponse.json(updatedDeck, { status: 201 })
    }),
    http.get('/decks/:id', async ({ params }) => {
        const decks = decksData.get(+params.id)

        return HttpResponse.json(decks, { status: 201 })
    }),
    http.delete('/decks/:id', ({ params }) => {
        decksData.delete(params.id)

        return HttpResponse.json(params.id, { status: 201 })
    }),
]