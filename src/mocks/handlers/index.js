import { http, HttpResponse } from 'msw'

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

export const handlers = [
    http.get('/dictionary', () => {
        return HttpResponse.json(Array.from(dictionaryData.values()))
    }),
    http.post('/dictionary', async ({ request }) => {
        const newPost = await request.json()
        newPost.id = Date.now()

        dictionaryData.set(newPost.id, newPost)

        return HttpResponse.json(newPost, { status: 201 })
    }),
    // http.delete('/posts/:id', ({ params }) => {
    //     console.log(`Captured a "DELETE /posts/${params.id}" request`)
    // }),
]