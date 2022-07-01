import type { RequestEvent } from "@sveltejs/kit"
import { api } from './_api'

/** @type {import('./__types/items').RequestHandler} */
// export const get: RequestHandler = async () => {
export async function get(event: RequestEvent) {
    return api(event)
}

/** @type {import('./__types/items').RequestHandler} */
// export const post: RequestHandler = async (event: RequestEvent) => {
export async function post(event: RequestEvent) {
    const formData = await event.request.formData()
    const texto = formData.get('text')?.toString()
    return api(event, {
        uid: `${Date.now()}`,  //TODO: Replace with the UID from the database
        created_at: new Date(),
        done: false,
        text: texto
    })
}