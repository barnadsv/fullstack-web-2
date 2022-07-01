import type { RequestEvent } from '@sveltejs/kit'
import PrismaClient from '$lib/prisma'

const prisma = new PrismaClient()

export const api = async (event: RequestEvent, data?: Record<string, unknown>) => {
    let body = {}
    let status = 500
    switch (event.request.method.toUpperCase()) {
        case 'GET':
            body = await prisma.todo.findMany()
            status = 200
            break
        case 'POST':
            if (data) {
                body = await prisma.todo.create({ 
                    data: { 
                        created_at: data.created_at as Date,
                        done: data.done as boolean,
                        text: data.text as string
                    }
                })
                status = 201
            }
            break
        case 'DELETE':
            body = await prisma.todo.delete({
                where: {
                    uid: event.params.uid
                }
            })
            status = 200
            break
        case 'PATCH':
            if (data) {
                body = await prisma.todo.update({
                    where: {
                        uid: event.params.uid
                    },
                    data: {
                        done: data.done as boolean,
                        text: data.text as string
                    }
                })
            }
            status = 200
            break
        default:
            break
        
    }

    if (event.request.method.toUpperCase() !== 'GET' && 
        event.request.headers.get('accept') !== 'application/json') {
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