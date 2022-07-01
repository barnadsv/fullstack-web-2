import type { RequestHandler, RequestEvent } from "@sveltejs/kit"



// TODO: Persist in database
let todos: Todo[] = []

/** @type {import('./__types/items').RequestHandler} */
// export const get: RequestHandler = async () => {
export async function get() {
    return {
        status: 200,
        body: todos
    }
}

/** @type {import('./__types/items').RequestHandler} */
// export const post: RequestHandler = async (event: RequestEvent) => {
export async function post(event: RequestEvent) {
    const formData = await event.request.formData()
    const texto = formData.get('text')
    todos.push({
        created_at: new Date(),
        done: false,
        text: texto
    })
    return {
        status: 303,
        headers: {
            location: '/'
        }
    }
}