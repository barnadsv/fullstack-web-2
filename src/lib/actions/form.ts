export const enhance = (form: HTMLFormElement, { result, error }) => {
    
    const handleSubmit = async (event: Event) => {
        event.preventDefault()
        try {
            const body = new FormData(form)
            const res = await fetch(
                form.action, 
                { 
                    method: form.method,
                    headers: {
                        accept: 'application/json'
                    },
                    body
                }
            )
            if (res.ok) {
                result(res, form)
            } else {
                error(res)
            }
        } catch (err) {
            error(new Response(null, { status: 500, statusText: err as string}))
        }
    }
    
    form.addEventListener('submit', handleSubmit)

    return {
        destroy() {
            form.removeEventListener('submit', handleSubmit)
        }
    }
}