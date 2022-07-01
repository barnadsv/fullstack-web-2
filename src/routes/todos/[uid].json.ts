import type { RequestEvent } from '@sveltejs/kit'
import { api } from './_api'

/** @type {import('./__types/items').RequestHandler} */
export const del = (event: RequestEvent) => {
    return api(event)
}

/** @type {import('./__types/items').RequestHandler} */
export async function patch(event: RequestEvent) {
    const formData = await event.request.formData()
    const texto = formData.get('text')?.toString()
    return api(event, {
        text: texto
    })
}