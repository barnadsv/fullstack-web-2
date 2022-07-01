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
    const done = formData.get('done') ? !!formData.get('done') : undefined
    return api(event, {
        text: texto,
        done
    })
}