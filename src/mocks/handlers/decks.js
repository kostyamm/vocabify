import { http, HttpResponse} from 'msw'

const mockDecksData = [
    {
        id: 1,
        title: 'English',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 2,
        title: 'Polish',
        originalLanguage: 'RU',
        targetLanguage: 'PL',
    },
    {
        id: 3,
        title: 'Belarusian',
        originalLanguage: 'RU',
        targetLanguage: 'BE',
    },
    {
        id: 4,
        title: 'Sport',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 5,
        title: 'Family (eng)',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 6,
        title: 'Home',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 7,
        title: 'Travel',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
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
        newDeck.originalLanguage = 'RU'
        newDeck.targetLanguage = 'EN'

        decksData.set(newDeck.id, newDeck)

        return HttpResponse.json(newDeck, { status: 201 })
    }),
    http.put('/decks', async ({ request }) => {
        const updatedDeck = await request.json()

        decksData.set(updatedDeck.id, updatedDeck)

        return HttpResponse.json(updatedDeck, { status: 201 })
    }),
    http.get('/decks/:id', ({ params }) => {
        const decks = decksData.get(+params.id)

        return HttpResponse.json(decks, { status: 201 })
    }),
    http.delete('/decks/:id', ({ params }) => {
        decksData.delete(params.id)

        return HttpResponse.json(params.id, { status: 201 })
    }),
]