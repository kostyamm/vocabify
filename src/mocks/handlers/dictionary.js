import { http, HttpResponse} from 'msw'

const mockDictionaryData = [
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

const dictionaryData = new Map()
mockDictionaryData.forEach((dictionary) => {
    dictionaryData.set(dictionary.id, dictionary)
})

export const dictionary = [
    http.get('/dictionary', () => {
        return HttpResponse.json(Array.from(dictionaryData.values()))
    }),
    http.post('/dictionary', async ({ request }) => {
        const newDictionary = await request.json()
        newDictionary.id = Date.now()
        newDictionary.originalLanguage = 'RU'
        newDictionary.targetLanguage = 'EN'

        dictionaryData.set(newDictionary.id, newDictionary)

        return HttpResponse.json(newDictionary, { status: 201 })
    }),
    http.put('/dictionary', async ({ request }) => {
        const updatedDictionary = await request.json()

        dictionaryData.set(updatedDictionary.id, updatedDictionary)

        return HttpResponse.json(updatedDictionary, { status: 201 })
    }),
    http.get('/dictionary/:id', ({ params }) => {
        const dictionary = dictionaryData.get(+params.id)

        return HttpResponse.json(dictionary, { status: 201 })
    }),
    http.delete('/dictionary/:id', ({ params }) => {
        dictionaryData.delete(params.id)

        return HttpResponse.json(params.id, { status: 201 })
    }),
]