import type { RequestEvent } from "@sveltejs/kit"
import { api } from './_api'

/** @type {import('./__types/items').RequestHandler} */
export async function get(event: RequestEvent) {
    return api(event)
}

/** @type {import('./__types/items').RequestHandler} */
export async function post(event: RequestEvent) {
    const formData = await event.request.formData()
    const texto = formData.get('text')?.toString()
    return api(event, {
        created_at: new Date(),
        done: false,
        text: texto
    })
}