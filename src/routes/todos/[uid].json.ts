import type { RequestEvent } from '@sveltejs/kit'
import { api } from './_api'

/** @type {import('./__types/items').RequestHandler} */
export const del = (event: RequestEvent) => {
    return api(event)
}