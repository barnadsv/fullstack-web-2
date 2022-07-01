import type { RequestEvent } from "@sveltejs/kit"

// TODO: Persist in database
let todos: Todo[] = []

export const api = (event: RequestEvent, data?: Record<string, unknown>) => {
    let body = {}
    let status = 500
    switch (event.request.method.toUpperCase()) {
        case 'GET':
            body = todos
            status = 200
            break
        case 'POST':
            if (data) {
                todos.push(data as Todo)
                body = data
                status = 201
            }
            break
        case 'DELETE':
            todos = todos.filter(todo => todo.uid !== event.params.uid)
            status = 200
            break
        case 'PATCH':
            if (data) {
                todos = todos.map(todo => {
                    if (todo.uid === event.params.uid) {
                        todo.text = data.text as string
                    }
                    return todo
                })
            }
            status = 200
            break
        default:
            break
        
    }

    if (event.request.method.toUpperCase() !== 'GET') {
        return {
            status: 303,
            headers: {
                location: '/'
            }
        }
    }

    return {
        status,
        body
    }
}